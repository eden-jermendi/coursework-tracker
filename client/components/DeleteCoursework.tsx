import { useQueryClient, useMutation } from '@tanstack/react-query'
import { deleteCoursework } from '../../client/apis/coursework.ts'

interface Props {
  id: number
}

function DeleteCoursework({ id }: Props) {
  const queryClient = useQueryClient()

  const deleteCourseworkMutation = useMutation({
    mutationFn: (id: number) => deleteCoursework(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coursework'] })
    },
  })

  const handleClick = () => {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete the entry?',
    )

    if (!shouldDelete) {
      return
    }

    deleteCourseworkMutation.mutate(id)
  }

  return (
    <button className="action-button delete-button" onClick={handleClick}>
      Delete
    </button>
  )
}

export default DeleteCoursework
