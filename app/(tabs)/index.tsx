import { usePokemons } from "@//hook/usePokemons";
import { Image } from "expo-image";
import { ScrollView, Text, View, useWindowDimensions } from "react-native";

export default function TabOneScreen() {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const { pokemons, loading, error } = usePokemons();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        gap: 15,
      }}
    >
      <ScrollView style={{ width: "100%", padding: 16 }}>
        {loading && <Text>Cargando...</Text>}
        {error && <Text style={{ color: "red" }}>{error}</Text>}
        {pokemons.map((pokemon) => (
          <View
            key={pokemon.name}
            style={{
              padding: 10,
              marginBottom: 10,
              backgroundColor: "#f5f5f5",
              borderRadius: 8,
              width: "100%",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {pokemon.name.charAt(0).toUpperCase() +
                pokemon.name.slice(1).toLowerCase()}
            </Text>
            <Image
              source={pokemon.url}
              style={{
                width: SCREEN_WIDTH / 2,
                height: 200,
                marginVertical: 10,
                alignSelf: "center",
              }}
              contentFit={"cover"}
              transition={500}
            />
            <Text style={{ color: "#666" }}>{pokemon.url}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
