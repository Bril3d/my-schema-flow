import { useCanvasStore } from '@stores/Canvas';
import {
    getActiveEdges,
    calculateEdgePosition as calculate,
} from '@utilities/CanvasHelper';
import { useVueFlow } from '@vue-flow/core';

export function useEdgePositionCalculator() {
    const canvasStore = useCanvasStore();
    const { getEdges, setEdges } = useVueFlow();
    const calculateAllEdgesPosition = () => {
        setEdges((edges) => {
            return edges.map((edge) => {
                const { targetHandle, sourceHandle } = calculate(edge);
                edge.sourceHandle = sourceHandle;
                edge.targetHandle = targetHandle;
                return edge;
            });
        });
    };
    const calculateActiveEdgesPosition = () => {
        const ActiveEdges = getActiveEdges(
            canvasStore.currentActiveNode,
            getEdges.value,
        );
        setEdges((edges) => {
            return edges.map((edge) => {
                const edgeId = edge.id;
                const edgeExistence = ActiveEdges.find((e) => e.id === edgeId);
                if (!edgeExistence) return edge;
                const { targetHandle, sourceHandle } = calculate(edge);
                edge.sourceHandle = sourceHandle;
                edge.targetHandle = targetHandle;

                return edge;
            });
        });
    };

    return {
        calculateAllEdgesPosition,
        calculateActiveEdgesPosition,
    };
}