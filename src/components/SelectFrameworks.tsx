"use client"

import * as React from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Skill } from "@/types"

export const items: { value: string; label: Skill }[] = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "docker",
    label: "Docker",
  },
  {
    value: "graphql",
    label: "GraphQL",
  },
  {
    value: "node.js",
    label: "Node.js",
  },
]

type Props = {
  onItemsChange: (newItems: typeof items) => void
}

const SelectFrameworks = ({ onItemsChange }: Props) => {
  const [open, setOpen] = React.useState(false)
  const [selectedItems, setSelectedItems] = React.useState<typeof items>([])

  const toggleItem = (item: (typeof items)[number]) => {
    setSelectedItems((current) => {
      const items = current.some(
        (selectedItem) => selectedItem.value === item.value,
      )
        ? current.filter((selectedItem) => selectedItem.value !== item.value)
        : [...current, item]

      onItemsChange(items)
      return items
    })
  }

  const removeItem = (item: (typeof items)[number]) => {
    setSelectedItems((current) => {
      const items = current.filter(
        (selectedItem) => selectedItem.value !== item.value,
      )

      onItemsChange(selectedItems)

      return items
    })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-start"
        >
          {selectedItems.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {selectedItems.map((item) => (
                <Badge key={item.value} variant="secondary" className="mr-1">
                  {item.label}
                  <div
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        removeItem(item)
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onClick={() => removeItem(item)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </div>
                </Badge>
              ))}
            </div>
          ) : (
            "Choisissez un tag..."
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search items..." className="h-9" />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => toggleItem(item)}
                >
                  <div
                    className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary ${
                      selectedItems.some(
                        (selectedItem) => selectedItem.value === item.value,
                      )
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50 [&_svg]:invisible"
                    }`}
                  >
                    <X className="h-4 w-4" />
                  </div>
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default SelectFrameworks
