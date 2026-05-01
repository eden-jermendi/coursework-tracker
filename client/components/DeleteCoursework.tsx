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
    deleteCourseworkMutation.mutate(id)
  }

  return <button onClick={handleClick}>Delete</button>
}

export default DeleteCoursework
