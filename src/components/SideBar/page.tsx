import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
export default function SideBar() {
  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutley sure?</SheetTitle>
          <SheetDescription>
            This Action cannot be undone.This will parmanently delete your account and remove your data from our servers
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}