import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { IProductDB, IProductVariant } from "@/types/interfaces";
import { FontAwesome5 } from "@expo/vector-icons";
import { getSlicedID } from "@/helpers/functions";
import AttributContainer from "./AttributContainer";
import { openPicker } from "@/helpers/openPicker";

const VariantCard = ({
  variant,
  type,
  variants,
  category,
  setVariants,
}: {
  variant: IProductVariant;
  type: boolean;
  variants: IProductVariant[];
  category: IProductDB["category"];
  setVariants: React.Dispatch<React.SetStateAction<IProductVariant[]>>;
}) => {
  return (
    <View
      key={variant._id}
      className="bg-white/10 rounded-lg p-4 w-[250px] mr-3 relative"
    >
      {type && (
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              "Diqqət çeşidi silmək üzrəsiniz",
              `${getSlicedID(variant._id)} saylı çeşidi silmək istəyirsiniz?`,
              [
                {
                  text: "Xeyr",
                  onPress: () => {
                    const cancelVariants = variants.map((v) =>
                      v._id === variant._id ? variant : v
                    );
                    setVariants(cancelVariants);
                  },
                },
                {
                  text: "Bəli",
                  onPress: () => {
                    const newVariants = variants.filter(
                      (v) => v._id !== variant._id
                    );
                    setVariants(newVariants);
                  },
                },
              ]
            );
          }}
          className="absolute top-2 right-2"
        >
          <FontAwesome5 name={"trash"} size={16} color={"red"} />
        </TouchableOpacity>
      )}
      <Text className="text-white font-bold text-lg mb-2">
        Çeşid {getSlicedID(variant._id)}
      </Text>

      <ScrollView horizontal nestedScrollEnabled>
        {variant.images.map((image) => (
          <View className="relative" key={image._id}>
            <Image
              key={image._id}
              source={{ uri: image.imageUrl }}
              className="w-40 h-40 rounded-md mr-2"
            />
            {type && (
              <TouchableOpacity
                onPress={() => {
                  const newVariant = {
                    ...variant,
                    images: variant.images.filter((i) => i._id !== image._id),
                  };

                  if (newVariant.images.length === 0) {
                    Alert.alert(
                      "Diqqət",
                      "Çeşidə aid bütün şəkilləri silmək üzrəsiniz. Əgər təsdiq etsəniz faktiki çeşid silinəcəkdir",
                      [
                        {
                          text: "Ləğv et",
                          onPress: () => {
                            const cancelVariants = variants.map((v) =>
                              v._id === variant._id ? variant : v
                            );
                            setVariants(cancelVariants);
                          },
                        },
                        {
                          text: "Təsdiq et",
                          onPress: () => {
                            const newVariants = variants.filter(
                              (v) => v._id !== variant._id
                            );
                            setVariants(newVariants);
                          },
                        },
                      ]
                    );
                  } else {
                    const newVariants = variants.map((v) =>
                      v._id === variant._id ? newVariant : v
                    );
                    setVariants(newVariants);
                  }
                }}
                className="absolute top-0 right-4"
              >
                <FontAwesome5 name={"times"} size={20} color={"red"} />
              </TouchableOpacity>
            )}
          </View>
        ))}

        {type && (
          <TouchableOpacity
            className="w-40 h-40 bg-white/10 rounded-lg p-4 flex-col items-center justify-center"
            onPress={() => {
              openPicker((v) => {
                if (v.length > 0) {
                  const newVariant = {
                    ...variant,
                    images: [...variant.images, ...v],
                  };
                  const newVariants = variants.map((v) =>
                    v._id === variant._id ? newVariant : v
                  );
                  setVariants(newVariants);
                }
              }, "sub");
            }}
          >
            <FontAwesome5 name="plus-circle" size={30} color="orange" />
            <Text className="text-sm text-gray-100 text-center font-pmedium mt-2">
              Şəkilləri seçin
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <AttributContainer
        variant={variant}
        category={category}
        variants={variants}
        setVariants={setVariants}
        type={type}
      />
    </View>
  );
};

export default VariantCard;
