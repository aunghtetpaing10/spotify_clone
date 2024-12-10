import { Album } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import AddAlbumsDialog from "./AddAlbumsDialog";
import AlbumsTable from "./AlbumsTable";

const AlbumsTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Album className="size-5 text-emerald-500" />
              Albums Library
            </CardTitle>
            <CardDescription>Manage your album collections</CardDescription>
          </div>
          <AddAlbumsDialog />
        </div>
      </CardHeader>
      <CardContent>
        <AlbumsTable />
      </CardContent>
    </Card>
  )
}

export default AlbumsTabContent