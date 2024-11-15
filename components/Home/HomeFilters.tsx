import { View } from "react-native";
import React from "react";
import SearchInput from "./SearchInput";
import CustomSelect from "../CustomSelect";

const HomeFilters = ({ setFilters }: { setFilters: (prev: any) => void }) => {
  return (
    <View className="w-full flex-col gap-2 p-2 rounded-lg">
      <SearchInput
        setFilters={setFilters}
        type="search"
        placeholder="Ad üzrə axtarış"
        className="w-full"
      />

      <View className="items-center flex-row justify-between">
        <SearchInput
          setFilters={setFilters}
          type="id"
          placeholder="ID üzrə axtarış"
          className="w-[170px]"
        />

        <CustomSelect
          modalTitle="Status seçin"
          data={[
            { id: "true", title: "Aktiv" },
            { id: "false", title: "Deaktiv" },
            { id: "null", title: "Hamısı" },
          ]}
          placeholder="Status üzrə axtarış"
          containerStyles="w-[150px]"
          handleChange={(e) =>
            setFilters((prev: any) => ({
              ...prev,
              isActive: e ? JSON.parse(e.toString()) : null,
            }))
          }
        />
      </View>
    </View>
  );
};

export default HomeFilters;
