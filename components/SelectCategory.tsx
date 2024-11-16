import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
} from "react-native";
import { categories } from "@/static/categories";
import { icons } from "@/constants";

const SelectCategory: React.FC<{
  setValue: (value: any) => void;
  error?: string | undefined;
  value?: any;
  disabled?: boolean;
}> = ({ setValue, error, value, disabled = false }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState({
    main: { title: "", id: "" },
    sub: { title: "", id: "" },
    child: { title: "", id: "" },
  });

  useEffect(() => {
    if (value) {
      findCategory(value.main + "+" + value.sub + "+" + value.child);
    }
  }, []);

  const findCategory = (value: string) => {
    const [main, sub, child] = value.split("+");
    Object.entries(categories).map(([mainkey, mainvalue]) => {
      if (mainkey === main) {
        Object.entries(mainvalue.subs).map(([subkey, subvalue]) => {
          if (subkey === sub) {
            Object.entries(subvalue.child).map(([childkey, childvalue]) => {
              if (childkey === child) {
                setSelectedCategory({
                  main: { id: mainkey, title: mainvalue.title },
                  sub: { id: subkey, title: subvalue.title },
                  child: { id: childkey, title: childvalue.title },
                });

                setValue({
                  main: { id: mainkey, ...mainvalue },
                  sub: { id: subkey, ...subvalue },
                  child: { id: childkey, ...childvalue },
                });
              }
            });
          }
        });
      }
    });
  };

  const renderCategory = () => (
    <FlatList
      data={Object.entries(categories)}
      keyExtractor={(item) => item[0]}
      renderItem={({ item: [main, mainValue] }) => (
        <View className={"mb-4"}>
          <Text className={"font-bold text-xl"}>{mainValue.title}</Text>
          <FlatList
            data={Object.entries(mainValue.subs)}
            keyExtractor={(subItem) => subItem[0]}
            renderItem={({ item: [sub, subValue] }) => (
              <View className={"ml-10 mb-7"}>
                <Text className={"font-semibold text-xl"}>
                  {subValue.title}
                </Text>
                <FlatList
                  data={Object.entries(subValue.child)}
                  keyExtractor={(childItem) => childItem[0]}
                  renderItem={({ item: [child, childValue] }) => (
                    <TouchableOpacity
                      className={"ml-7"}
                      onPress={() => {
                        setSelectedCategory({
                          main: { id: main, title: mainValue.title },
                          sub: { id: sub, title: subValue.title },
                          child: { id: child, title: childValue.title },
                        });
                        setValue({
                          main: { id: main, ...mainValue },
                          sub: { id: sub, ...subValue },
                          child: { id: child, ...childValue },
                        });
                        setModalVisible(false);
                      }}
                    >
                      <Text className={"text-blue-700 mt-2 text-xl"}>
                        {childValue.title}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          />
        </View>
      )}
    />
  );
  return (
    <View className={"flex-1 justify-center items-center w-full gap-2"}>
      <Text className="text-base text-gray-100  font-pmedium text-start w-full">
        Kateqoriya
      </Text>
      {disabled ? (
        <View className="border-2 border-black-200 w-full h-12 flex-row  bg-black-100   rounded-2xl focus:border-secondary items-center p-3 ">
          <Text className={`text-base text-gray-100  font-pmedium`}>
            {value.child
              ? selectedCategory.main.title +
                " - " +
                selectedCategory.sub.title +
                " - " +
                selectedCategory.child.title
              : "Seç"}
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          className="border-2 border-black-200 w-full h-12 flex-row  bg-black-100   rounded-2xl focus:border-secondary items-center p-3 "
          onPress={() => setModalVisible(true)}
        >
          <Text className={`text-base text-gray-100  font-pmedium`}>
            {value.child
              ? selectedCategory.main.title +
                " - " +
                selectedCategory.sub.title +
                " - " +
                selectedCategory.child.title
              : "Seç"}
          </Text>
        </TouchableOpacity>
      )}

      {error && (
        <Text className="text-red-500 w-full overflow-hidden text-sm">
          {error.toString()}
        </Text>
      )}

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          className={`w-full bg-white p-5 rounded-lg h-full pb-[50%] mt-[50%]`}
        >
          <TouchableOpacity
            className={"absolute top-2 right-2"}
            onPress={() => setModalVisible(false)}
          >
            <Image
              source={icons.close}
              resizeMode="contain"
              className="w-5 h-5"
            />
          </TouchableOpacity>

          {renderCategory()}
        </View>
      </Modal>
    </View>
  );
};

export default SelectCategory;
