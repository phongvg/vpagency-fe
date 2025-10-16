import { Columns } from '@/views/tasks/assign/types'
import { DraggableLocation } from 'react-beautiful-dnd'

export const reorder = <T>(list: T[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export const reorderQuoteMap = ({
  quoteMap,
  source,
  destination,
}: {
  quoteMap: Columns
  source: DraggableLocation
  destination: DraggableLocation
}) => {
  const current = [...quoteMap[source.droppableId]]
  const next = [...quoteMap[destination.droppableId]]
  const target = current[source.index]

  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current, source.index, destination.index)
    const result = {
      ...quoteMap,
      [source.droppableId]: reordered,
    }
    return {
      quoteMap: result,
    }
  }
  current.splice(source.index, 1)
  next.splice(destination.index, 0, target)
  const result = {
    ...quoteMap,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  }

  return {
    quoteMap: result,
  }
}
