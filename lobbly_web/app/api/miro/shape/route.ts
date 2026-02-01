import { NextResponse } from "next/server";

type TreeNode = {
  id: string;
  depth: number;
  childCount: number;
  position: { x: number; y: number };
};

const MAX_CHILDREN = 4;
const MAX_DEPTH = 10;
const X_GAP = 320;
const Y_GAP = 140;

const boardTrees = new Map<string, TreeNode[]>();

async function miroCreate(
  accessToken: string,
  boardId: string,
  path: string,
  body: unknown
) {
  const response = await fetch(`https://api.miro.com/v2/boards/${boardId}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Miro API error (${response.status}): ${text}`);
  }

  return response.json();
}

function getOrCreateTree(boardId: string) {
  const existing = boardTrees.get(boardId);
  if (existing) return existing;
  const tree: TreeNode[] = [];
  boardTrees.set(boardId, tree);
  return tree;
}

function findNextParent(tree: TreeNode[]) {
  for (const node of tree) {
    if (node.depth >= MAX_DEPTH) continue;
    if (node.childCount < MAX_CHILDREN) return node;
  }
  return null;
}

function computeChildPosition(parent: TreeNode, index: number) {
  const offset = index - (MAX_CHILDREN - 1) / 2;
  return {
    x: parent.position.x + offset * X_GAP,
    y: parent.position.y + Y_GAP,
  };
}

export async function POST(request: Request) {
  const accessToken = process.env.MIRO_ACCESS_TOKEN;
  const defaultBoardId = process.env.MIRO_BOARD_ID;

  if (!accessToken) {
    return NextResponse.json(
      { error: "Missing MIRO_ACCESS_TOKEN in environment." },
      { status: 400 }
    );
  }

  let payload: { text?: string; boardId?: string } = {};
  try {
    payload = await request.json();
  } catch (error) {
    payload = {};
  }

  const text = payload.text?.trim() ?? "";
  const boardId = payload.boardId ?? defaultBoardId;

  if (!boardId) {
    return NextResponse.json(
      { error: "Missing boardId in request or MIRO_BOARD_ID in environment." },
      { status: 400 }
    );
  }

  if (!text) {
    return NextResponse.json({ error: "text is required." }, { status: 400 });
  }

  try {
    const tree = getOrCreateTree(boardId);
    let parent: TreeNode | null = null;
    let position = { x: 0, y: 0 };

    if (tree.length === 0) {
      position = { x: 0, y: 0 };
    } else {
      parent = findNextParent(tree);
      if (!parent) {
        return NextResponse.json(
          { error: "Tree has reached the maximum depth." },
          { status: 400 }
        );
      }
      position = computeChildPosition(parent, parent.childCount);
    }

    const created = await miroCreate(accessToken, boardId, "/shapes", {
      data: {
        content: text,
        shape: "round_rectangle",
      },
      position: {
        x: position.x,
        y: position.y,
        origin: "center",
      },
      geometry: {
        width: 280,
        height: 96,
      },
      style: {
        fillColor: "#E8F0FF",
        borderColor: "#1F2937",
        textAlign: "center",
        textAlignVertical: "middle",
        fontSize: 14,
      },
    });

    const node: TreeNode = {
      id: created.id,
      depth: parent ? parent.depth + 1 : 0,
      childCount: 0,
      position,
    };
    tree.push(node);

    if (parent) {
      parent.childCount += 1;
      await miroCreate(accessToken, boardId, "/connectors", {
        startItem: { id: parent.id },
        endItem: { id: created.id },
        shape: "straight",
        style: {
          strokeColor: "#1F2937",
          endStrokeCap: "arrow",
        },
      });
    }

    return NextResponse.json({ id: created.id, parentId: parent?.id ?? null });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
