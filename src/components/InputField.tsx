import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ComponentProps } from "react"
import { Control, FieldValues, Path } from "react-hook-form"

type Props<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: Path<TFieldValues>
  label: string
  description?: string
} & Omit<ComponentProps<typeof Input>, "name">

const InputField = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  ...props
}: Props<TFieldValues>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input {...props} {...field} />
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
)

export default InputField
