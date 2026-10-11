import { cryptoContent } from './cryptoContent';

export interface MindMapNode {
    id: string;
    label: string;
    type: 'root' | 'category' | 'feature' | 'metric';
    parentId?: string;
    description?: string;
    x?: number;
    y?: number;
    data?: any;
}

export interface MindMapEdge {
    id: string;
    source: string;
    target: string;
}

// Transform the flat cryptoContent array into a hierarchical, vertical timeline mind map structure
const generateVerticalMindMapData = () => {
    const nodes: any[] = [];
    const edges: any[] = [];

    // We will lay out all sections vertically
    const startY = 250;
    const gapY = 400; // Vertical gap between main sections
    const centerX = 600;

    // Root Title Node at the very top
    const rootNode = {
        id: 'root',
        label: 'AI-Native Revenue Protocol',
        type: 'root',
        description: 'The 7-Layer Architecture of Data-Driven Decision Making',
        x: centerX,
        y: 0
    };
    nodes.push(rootNode);

    cryptoContent.forEach((section, index) => {
        const categoryId = `cat-${index}`;
        const currentY = startY + (index * gapY);

        // 1. Unified Section Node
        nodes.push({
            id: categoryId,
            type: 'timeline-section',
            parentId: 'root',
            x: centerX,
            y: currentY,
            data: {
                number: (index + 1).toString().padStart(2, '0'),
                title: section.title,
                tagline: section.tagline,
                icon: section.icon,
                colorIndex: index,
                tags: section.portfolioCards.map(c => c.title)
            }
        });

        // Link from Root to First, or Previous to Current to create the spine
        if (index === 0) {
            edges.push({
                id: `edge-root-${categoryId}`,
                source: 'root',
                target: categoryId,
                type: 'straight',
                animated: true
            });
        } else {
            const prevId = `cat-${index - 1}`;
            edges.push({
                id: `edge-${prevId}-${categoryId}`,
                source: prevId,
                target: categoryId,
                type: 'straight',
                animated: true,
                style: { stroke: '#e2e8f0', strokeWidth: 2 }
            });
        }
    });

    return { title: "AI-Native Revenue Protocol", nodes, edges };
};

export const cryptoMindMapData = generateVerticalMindMapData();
