import { NextResponse } from "next/server";

type TreeNode = {
  label: string;
  depth: number;
  line: number;
  parentIndex: number | null;
};

const X_GAP = 320;
const Y_GAP = 140;
const NODE_WIDTH = 220;
const NODE_HEIGHT = 72;

function parseTree(text: string): TreeNode[] {
  const nodes: TreeNode[] = [];
  const stack: number[] = [];
  const lines = text.split(/\r?\n/);

  lines.forEach((raw, index) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const depthMatch = trimmed.match(/^(>*)/);
    const depth = depthMatch ? depthMatch[1].length : 0;
    const content = trimmed.replace(/^(>*)\s*/, "");
    const labelPart = content.split("::")[0]?.trim() ?? "";
    const label = labelPart.replace(/^Claim:\s*/i, "").trim();
    if (!label) return;

    const parentIndex = depth > 0 ? stack[depth - 1] ?? null : null;

    const nodeIndex = nodes.length;
    stack[depth] = nodeIndex;
    stack.length = depth + 1;

    nodes.push({ label, depth, line: index, parentIndex });
  });

  return nodes;
}

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

export async function POST(request: Request) {
  const accessToken = process.env.MIRO_ACCESS_TOKEN;
  const defaultBoardId = process.env.MIRO_BOARD_ID;

  if (!accessToken) {
    return NextResponse.json(
      { error: "Missing MIRO_ACCESS_TOKEN in environment." },
      { status: 400 }
    );
  }

  let payload: { treeText?: string; boardId?: string } = {};
  try {
    payload = await request.json();
  } catch (error) {
    payload = {};
  }

  const treeText = payload.treeText ?? "";
  const boardId = payload.boardId ?? defaultBoardId;

  if (!boardId) {
    return NextResponse.json(
      { error: "Missing boardId in request or MIRO_BOARD_ID in environment." },
      { status: 400 }
    );
  }

  if (!treeText.trim()) {
    return NextResponse.json(
      { error: "treeText is required." },
      { status: 400 }
    );
  }

  const nodes = parseTree(treeText);
  if (nodes.length === 0) {
    return NextResponse.json(
      { error: "No valid nodes found in treeText." },
      { status: 400 }
    );
  }

  try {
    const createdItems: { id: string }[] = [];

    for (const node of nodes) {
      const x = node.depth * X_GAP;
      const y = node.line * Y_GAP;
      const created = await miroCreate(accessToken, boardId, "/shapes", {
        data: {
          content: node.label,
          shape: "round_rectangle",
        },
        position: {
          x,
          y,
          origin: "center",
        },
        geometry: {
          width: NODE_WIDTH,
          height: NODE_HEIGHT,
        },
        style: {
          fillColor: "#FFF6E6",
          borderColor: "#1F2937",
          textAlign: "center",
          textAlignVertical: "middle",
          fontSize: 14,
        },
      });

      createdItems.push({ id: created.id });
    }

    let connectorCount = 0;
    for (let index = 0; index < nodes.length; index += 1) {
      const node = nodes[index];
      if (node.parentIndex === null) continue;

      await miroCreate(accessToken, boardId, "/connectors", {
        startItem: { id: createdItems[node.parentIndex].id },
        endItem: { id: createdItems[index].id },
        shape: "straight",
        style: {
          strokeColor: "#1F2937",
          endStrokeCap: "arrow",
        },
      });

      connectorCount += 1;
    }

    return NextResponse.json({
      created: createdItems.length,
      connectors: connectorCount,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
