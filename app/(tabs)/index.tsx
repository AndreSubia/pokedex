import { usePokemons } from "@//hook/usePokemons";
import { ScrollView, Text, View } from "react-native";

export default function TabOneScreen() {
  const { pokemons, loading, error } = usePokemons();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 15,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Pokédex</Text>
      <ScrollView style={{ width: "100%", padding: 10 }}>
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
            <Text style={{ fontSize: 16 }}>{pokemon.name}</Text>
            <Text style={{ color: "#666" }}>{pokemon.url}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
