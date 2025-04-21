import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Jean Dupont</p>
          <p className="text-sm text-muted-foreground">jean.dupont@example.com</p>
        </div>
        <div className="ml-auto font-medium">+124.50€</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>ML</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Marie Lefevre</p>
          <p className="text-sm text-muted-foreground">marie.lefevre@example.com</p>
        </div>
        <div className="ml-auto font-medium">+75.00€</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>PB</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Pierre Blanc</p>
          <p className="text-sm text-muted-foreground">pierre.blanc@example.com</p>
        </div>
        <div className="ml-auto font-medium">+93.75€</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sophie Martin</p>
          <p className="text-sm text-muted-foreground">sophie.martin@example.com</p>
        </div>
        <div className="ml-auto font-medium">+42.25€</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Lucas Robert</p>
          <p className="text-sm text-muted-foreground">lucas.robert@example.com</p>
        </div>
        <div className="ml-auto font-medium">+128.00€</div>
      </div>
    </div>
  )
}
