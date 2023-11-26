import { defineStore } from 'pinia';

export const useTableStore = defineStore('tableStore', {
    state: () => ({
        elements: [
            {
                id: '1',
                type: 'custom',
                label: 'Node 1',
                connectable: false,
                position: { x: 250, y: 5 },
            },
            {
                id: '2',
                type: 'custom',
                label: 'Node 2',
                connectable: false,
                position: { x: 100, y: 100 },
            },
            {
                id: '3',
                type: 'custom',
                label: 'Node 3',
                connectable: false,
                position: { x: 400, y: 100 },
            },
            {
                id: '4',
                type: 'custom',
                label: 'Node 4',
                connectable: false,
                position: { x: 500, y: 5 },
            },
            {
                id: '5',
                type: 'custom',
                label: 'Node 5',
                connectable: false,
                position: { x: 500, y: 150 },
            },
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2' },
            { id: 'e1-3', source: '1', target: '3' },
            { id: 'e1-4', source: '1', target: '4' },
            {
                id: 'e1-4',
                source: '5',
                target: '4',
                targetHandleId: 'target-bottom',
            },
        ],
    }),
});
