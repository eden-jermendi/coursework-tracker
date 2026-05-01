import { useQueryClient, useMutation } from '@tanstack/react-query'
import { deleteCoursework } from '../../client/apis/coursework.ts'

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
