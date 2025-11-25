import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square w-full bg-muted animate-pulse" />
      <CardContent className="p-4">
        <div className="h-6 w-3/4 mb-2 bg-muted rounded animate-pulse" />
        <div className="h-4 w-full mb-1 bg-muted rounded animate-pulse" />
        <div className="h-4 w-2/3 mb-3 bg-muted rounded animate-pulse" />
        <div className="h-8 w-24 bg-muted rounded animate-pulse" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="h-10 w-full bg-muted rounded animate-pulse" />
      </CardFooter>
    </Card>
  )
}
