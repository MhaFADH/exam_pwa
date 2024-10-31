import DatePicker from "@/components/DatePicker"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form"

type Props<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>
  name: Path<TFieldValues>
  label: string
}

const DateInput = <TFieldsValues extends FieldValues>({
  name,
  label,
  form,
}: Props<TFieldsValues>) => (
  <FormField
    control={form.control}
    name={name}
    render={() => (
      <FormItem className="flex flex-col gap-2">
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <DatePicker
            selected={form.watch(name)}
            onSelect={(day) => {
              if (!day) {
                return
              }

              form.setValue(
                name,
                day as PathValue<TFieldsValues, Path<TFieldsValues>>,
              )
              form.clearErrors(name)
            }}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

export default DateInput
