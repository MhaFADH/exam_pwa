import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { ReactNode } from "react"
import { FieldValues, Path, UseFormReturn } from "react-hook-form"

type Props<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>
  name: Path<TFieldValues>
  label: string
  children: ReactNode
}

const CustomInput = <TFieldsValues extends FieldValues>({
  name,
  label,
  form,
  children,
}: Props<TFieldsValues>) => (
  <FormField
    control={form.control}
    name={name}
    render={() => (
      <FormItem className="flex flex-col gap-2">
        <FormLabel>{label}</FormLabel>
        <FormControl>{children}</FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

export default CustomInput
