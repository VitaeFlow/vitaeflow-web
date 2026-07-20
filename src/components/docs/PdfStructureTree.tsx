import { useState } from 'react';

interface TreeNode {
  label: string;
  icon: string;
  tag?: string;
  tagColor?: string;
  detail?: string;
  children?: TreeNode[];
}

const tree: TreeNode = {
  label: 'PDF Document',
  icon: '📄',
  children: [
    {
      label: 'Catalog',
      icon: '📑',
      detail: 'The root object of the PDF. All top-level structures are referenced from here.',
      children: [
        {
          label: 'Names',
          icon: '📂',
          detail: 'A dictionary of name trees used for various lookups.',
          children: [
            {
              label: 'EmbeddedFiles',
              icon: '📂',
              detail: 'Name tree that maps filenames to FileSpec references. This is the standard PDF 1.7 mechanism for embedded files.',
              children: [
                {
                  label: '"vitaeflow.json"',
                  icon: '📎',
                  tag: 'FileSpec ref',
                  tagColor: 'teal',
                  detail: 'The entry that links the filename to the FileSpec dictionary. Readers look for this exact name (case-sensitive) to detect VitaeFlow data.',
                },
              ],
            },
          ],
        },
        {
          label: 'AF',
          icon: '📋',
          tag: 'PDF/A-3',
          tagColor: 'blue',
          detail: 'Associated Files array (ISO 19005-3). Contains references to all associated FileSpec objects. This is one requirement used by PDF/A-3 readers, not full PDF/A-3 conformance by itself.',
          children: [
            {
              label: 'FileSpec ref',
              icon: '📎',
              detail: 'Same FileSpec reference as in EmbeddedFiles. Dual registration supports both PDF 1.7 readers and readers that understand PDF/A-3 associated files.',
            },
          ],
        },
        {
          label: 'Metadata',
          icon: '📝',
          tag: 'XMP',
          tagColor: 'amber',
          detail: 'XMP metadata stream. Contains RDF/XML with VitaeFlow properties (DocumentType, Version, ConformanceLevel, Generator).',
          children: [
            {
              label: 'vf:DocumentType',
              icon: '·',
              detail: 'Always "RESUME". Identifies this as a VitaeFlow document.',
              tag: '"RESUME"',
              tagColor: 'gray',
            },
            {
              label: 'vf:Version',
              icon: '·',
              detail: 'Schema version from the resume data, e.g. "0.2".',
              tag: '"0.2"',
              tagColor: 'gray',
            },
            {
              label: 'vf:ConformanceLevel',
              icon: '·',
              detail: 'Profile from the resume data. Always "standard".',
              tag: '"standard"',
              tagColor: 'gray',
            },
            {
              label: 'vf:Generator',
              icon: '·',
              detail: 'The tool that created this document, e.g. "@vitaeflow/sdk/0.2".',
              tag: 'optional',
              tagColor: 'gray',
            },
          ],
        },
      ],
    },
    {
      label: 'FileSpec Dictionary',
      icon: '📋',
      detail: 'Describes the embedded file. References the actual content stream.',
      children: [
        {
          label: 'Type',
          icon: '·',
          tag: '/Filespec',
          tagColor: 'gray',
          detail: 'PDF type identifier for this dictionary.',
        },
        {
          label: 'F',
          icon: '·',
          tag: '"vitaeflow.json"',
          tagColor: 'gray',
          detail: 'The filename of the embedded file.',
        },
        {
          label: 'Desc',
          icon: '·',
          tag: '"VitaeFlow structured resume data"',
          tagColor: 'gray',
          detail: 'Human-readable description of the attachment.',
        },
        {
          label: 'AFRelationship',
          icon: '·',
          tag: '/Alternative',
          tagColor: 'teal',
          detail: 'Indicates the JSON is an alternative representation of the same content as the visual PDF.',
        },
        {
          label: 'EF.F',
          icon: '📦',
          tag: 'stream',
          tagColor: 'teal',
          detail: 'The embedded file stream containing the actual JSON data, UTF-8 encoded and typically compressed with FlateDecode.',
          children: [
            {
              label: '{ "version": "0.2", "profile": "standard", "basics": { ... }, "work": [ ... ] }',
              icon: '{ }',
              detail: 'The resume data as a JSON object, following the VitaeFlow schema.',
            },
          ],
        },
      ],
    },
  ],
};

const tagColors: Record<string, string> = {
  teal: 'bg-[#568383]/10 text-[#568383]',
  blue: 'bg-blue-500/10 text-blue-600',
  amber: 'bg-amber-500/10 text-amber-600',
  gray: 'bg-[#243746]/6 text-[#243746]/60',
};

function TreeNodeRow({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const hasChildren = node.children && node.children.length > 0;
  const [open, setOpen] = useState(depth < 2);

  return (
    <div>
      <button
        onClick={() => hasChildren && setOpen(!open)}
        className={`group flex w-full items-start gap-2 rounded-lg px-3 py-2 text-left transition-colors ${
          hasChildren ? 'hover:bg-[#568383]/4 cursor-pointer' : 'cursor-default'
        }`}
        style={{ paddingLeft: `${depth * 20 + 12}px` }}
      >
        {hasChildren ? (
          <span className={`mt-0.5 text-[0.65rem] text-[#243746]/40 transition-transform ${open ? 'rotate-90' : ''}`}>
            ▶
          </span>
        ) : (
          <span className="mt-0.5 w-[0.65rem]" />
        )}

        <span className="mt-px text-sm leading-none">{node.icon}</span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-sm font-medium ${hasChildren ? 'text-[#243746]' : 'text-[#243746]/70'}`}>
              {node.label}
            </span>
            {node.tag && (
              <span className={`rounded-md px-1.5 py-0.5 text-[0.6rem] font-semibold ${tagColors[node.tagColor ?? 'gray']}`}>
                {node.tag}
              </span>
            )}
          </div>
          {open && node.detail && (
            <p className="mt-1 text-[0.75rem] leading-relaxed text-[#243746]/50">
              {node.detail}
            </p>
          )}
        </div>
      </button>

      {open && hasChildren && (
        <div>
          {node.children!.map((child, i) => (
            <TreeNodeRow key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function PdfStructureTree() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#243746]/8 bg-[#fffdf8]/80">
      <div className="flex items-center gap-2 border-b border-[#243746]/6 bg-[#243746]/3 px-4 py-2.5">
        <span className="text-xs font-bold uppercase tracking-wider text-[#568383]">PDF internal structure</span>
        <span className="text-[0.65rem] text-[#243746]/40">— click to expand</span>
      </div>
      <div className="py-2">
        <TreeNodeRow node={tree} />
      </div>
    </div>
  );
}
