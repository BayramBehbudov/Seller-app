import React, { SetStateAction } from "react";
import Modal from "react-native-modal";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useSharedValue, withTiming, Easing } from "react-native-reanimated";
import { IHomeFilter } from "@/types/interfaces";
import SearchInput from "./SearchInput";
import CustomSelect from "../CustomSelect";
import { useGlobalContext } from "@/context/GlobalProvider";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface FilterModalProps {
  setFilters: React.Dispatch<SetStateAction<IHomeFilter>>;
  filters: IHomeFilter;
}

const FilterModal: React.FC<FilterModalProps> = ({ setFilters, filters }) => {
  const modalPosition = useSharedValue(SCREEN_WIDTH);
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useGlobalContext();
  const stores = user.stores.map((store) => ({
    id: store._id,
    title: store.name,
  }));
  useEffect(() => {
    if (isVisible) {
      modalPosition.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      modalPosition.value = withTiming(SCREEN_WIDTH, {
        duration: 300,
        easing: Easing.in(Easing.cubic),
      });
    }
  }, [isVisible]);

  return (
    <>
      <FontAwesome5
        name="filter"
        size={22}
        color="orange"
        onPress={() => setIsVisible(true)}
      />
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        onBackButtonPress={() => setIsVisible(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modal}
        backdropTransitionOutTiming={400}
      >
        <Animated.View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Məhsul tap</Text>
            <TouchableOpacity onPress={() => setIsVisible(false)}>
              <FontAwesome6 name="x" size={18} />
            </TouchableOpacity>
          </View>

          <View className="w-full flex-col gap-2 mt-5 h-fit ">
            <SearchInput
              setFilters={setFilters}
              type="search"
              placeholder="Ad üzrə axtarış"
              defaultValue={filters.search}
            />

            <SearchInput
              setFilters={setFilters}
              type="id"
              placeholder="ID üzrə axtarış"
              inputStyle={{ width: 150 }}
              defaultValue={filters.id}
            />
            <View className="flex-row justify-between">
              <CustomSelect
                modalTitle="Mağaza seçin"
                data={[...stores, { id: "null", title: "Hamısı" }]}
                defaultValue={
                  filters.storeId !== null
                    ? stores.find((store) => store.id === filters.storeId)
                    : {
                        id: "null",
                        title: "",
                      }
                }
                placeholder="Mağaza üzrə axtarış"
                containerStyles="w-[150px]"
                handleChange={(e) =>
                  setFilters((prev: any) => ({
                    ...prev,
                    storeId: e === "null" || !e ? null : e,
                  }))
                }
              />
              <CustomSelect
                modalTitle="Status seçin"
                data={[
                  { id: "true", title: "Aktiv" },
                  { id: "false", title: "Deaktiv" },
                  { id: "null", title: "Hamısı" },
                ]}
                placeholder="Status üzrə axtarış"
                defaultValue={
                  filters.isActive !== null
                    ? {
                        id: filters.isActive ? "true" : "false",
                        title: filters.isActive ? "Aktiv" : "Deaktiv",
                      }
                    : {
                        id: "",
                        title: "",
                      }
                }
                containerStyles="w-[150px]"
                handleChange={(e) =>
                  setFilters((prev: any) => ({
                    ...prev,
                    isActive: e || e !== "" ? JSON.parse(e.toString()) : null,
                  }))
                }
              />
            </View>
          </View>
          <View
            className="flex-row w-full  justify-between"
            style={{ position: "absolute", bottom: 5, right: 20 }}
          >
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => {
                setFilters({
                  isActive: null,
                  search: null,
                  id: null,
                  storeId: null,
                });
              }}
            >
              <Text style={styles.applyButtonText}>Sıfırla</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => setIsVisible(false)}
            >
              <Text style={styles.applyButtonText}>Axtar</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "white",
    minHeight: "45%",
    height: "auto",
    width: "100%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  applyButton: {
    width: "48%",
    backgroundColor: "#007AFF",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FilterModal;
