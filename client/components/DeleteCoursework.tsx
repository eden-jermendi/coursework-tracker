import { useQueryClient, useMutation } from '@tanstack/react-query'
import { deleteCoursework } from '../../client/apis/coursework.ts'
import confetti from 'canvas-confetti'

interface Props {
  id: number
  title: string
  onAnnounce: (message: string) => void
}

function DeleteCoursework({ id, title, onAnnounce }: Props) {
  const queryClient = useQueryClient()

  const deleteCourseworkMutation = useMutation({
    mutationFn: (id: number) => deleteCoursework(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coursework'] })
      onAnnounce(`Deleted coursework: ${title}.`)
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#00ff00', '#0000ff'],
      })
    },
    onError: () => {
      onAnnounce(`Unable to delete coursework: ${title}.`)
    },
  })

  const handleClick = () => {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete the entry?',
    )

    if (!shouldDelete) {
      return
    }

    onAnnounce(`Deleting coursework: ${title}.`)
    deleteCourseworkMutation.mutate(id)
  }

  return (
    <button
      className="action-button delete-button"
      type="button"
      aria-label={`Delete coursework: ${title}`}
      onClick={handleClick}
    >
      Delete
    </button>
  )
}

export default DeleteCoursework
