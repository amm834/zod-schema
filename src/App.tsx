import { object, Schema, string, TypeOf, ZodTypeAny } from "zod"

const LoginFormSchema = object({
  email: string().email(),
  password: string().min(8),
  passwordConfirmation: string().min(8),
})


type LoginForm = TypeOf<typeof LoginFormSchema>

const useForm = <TValues,>(
  schema: Schema<TValues>,
  onSubmit: (values: TValues) => void
) => {
  return {
    onSubmit: (data: TypeOf<typeof schema>) => {
      schema.parse(data)

      onSubmit(data)
    }
  }
}
function App() {
  useForm(LoginFormSchema, (values) => {
    console.log(values)
  })


  return (
    <div>
      Hello world
    </div>
  )
}

export default App
