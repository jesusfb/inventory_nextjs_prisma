import { Icons } from "components/Icons";
import Sidebar from "components/Sidebar";
import {
  ItemsColumns,
  ItemsTableData,
} from "components/dataTables/ItemsColumns";
import { ItemsDataTable } from "components/dataTables/ItemsDataTable";
import { AddItemTableData } from "components/dataTables/addItemColumns";
import Link from "next/link";
import { FC } from "react";
import { api } from "~/utils/api";

interface ItemsProps {}

const Items: FC<ItemsProps> = ({}) => {
  const { data, isLoading, error } = api.storedItem.getAllForUser.useQuery();
  if (isLoading) return <div>loading</div>;
  if (!data) return <div>no data</div>;

  const transformedData: ItemsTableData[] = data.map((item) => {
    return {
      itemName: item.name,
      price: item.ItemInfo[0]?.purchasePrice,
      storageName: item.itemStorage.name,
      storageLocation: item.itemStorage.location,
      managedLocation: item.itemStorage.managedLocation.location.name,
      managedLocationId: item.itemStorage.managedLocationId,
      storageId: item.itemStorageId,
    };
  });
  console.log("this is the transformed data", transformedData);

  return (
    <Sidebar>
      <div className="ml-10 mr-10">
        <h1 className="flex justify-center border-b-4 text-4xl"> Your Items</h1>
        <h2>
          {" "}
          <div
            className="mt-5 flex flex-shrink-0 
              text-lg"
          >
            <Link
              href="/items/add/select-storage "
              className="flex flex-shrink-0 flex-row  hover:text-purple-500"
            >
              add new item
              <Icons.PlusCircle className="ml-2 mt-1 opacity-50" />
            </Link>
          </div>
        </h2>
        <div className="container mx-auto max-w-4xl py-10">
          <ItemsDataTable columns={ItemsColumns} data={transformedData} />
        </div>
      </div>
    </Sidebar>
  );
};

export default Items;
