import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

// Re-export the collapsible components from Radix UI
// These components provide an accessible collapsible section that can be toggled
const Collapsible = CollapsiblePrimitive.Root

// The trigger component that toggles the collapsible section
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

// The content component that contains the collapsible content
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
