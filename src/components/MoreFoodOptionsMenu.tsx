import { MoreVertical } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContextFixed";
import { toast } from "@/hooks/use-toast";

interface MoreFoodOptionsMenuProps {
  foodId: string;
  mealType: string;
  onDelete: (foodId: string) => void;
}

export function MoreFoodOptionsMenu({ foodId, mealType, onDelete }: MoreFoodOptionsMenuProps) {
  const { translate } = useLanguage();

  const handleDuplicate = () => {
    toast({
      title: translate("item_duplicated"),
      description: translate("item_added_to_meal")
    });
  };

  const handleAddToFavorites = () => {
    toast({
      title: translate("added_to_favorites"),
      description: translate("item_added_to_favorites")
    });
  };

  const handleEdit = () => {
    toast({
      title: translate("edit_food"),
      description: translate("edit_food_description")
    });
  };

  const handleDelete = () => {
    onDelete(foodId);
    toast({
      title: translate("item_deleted"),
      description: translate("item_removed_from_meal")
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleEdit}>
          {translate("edit")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDuplicate}>
          {translate("duplicate")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleAddToFavorites}>
          {translate("add_to_favorites")}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleDelete}
          className="text-red-500 focus:text-red-500"
        >
          {translate("delete")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
