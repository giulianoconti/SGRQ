import React, { memo, useState, useEffect, useCallback } from "react";
import { View, Text, Alert, SafeAreaView, FlatList, ListRenderItem } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ResultBox } from "../components/ResultBox";
import { colors } from "../constants/theme";
import type { StoredResult } from "../types/result";

const STORAGE_KEY = "results";

function confirmAction(
  title: string,
  message: string,
  onConfirm: () => void | Promise<void>
): void {
  Alert.alert(
    title,
    message,
    [
      { text: "Cancelar", style: "cancel" },
      { text: "Borrar", onPress: onConfirm },
    ],
    { cancelable: false }
  );
}

export default memo(function ResultScreen() {
  const [resultsArray, setResultsArray] = useState<StoredResult[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (value) {
        try {
          setResultsArray(JSON.parse(value));
        } catch {
          setResultsArray([]);
        }
      }
    });
  }, []);

  const handleDeleteResult = useCallback((fullNameAndId: string) => {
    confirmAction(
      "Advertencia",
      `¿Quieres borrar los resultados de ${fullNameAndId}?`,
      async () => {
        setResultsArray((prev) => {
          const filtered = prev.filter((r) => r.fullNameAndId !== fullNameAndId);
          AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
          return filtered;
        });
      }
    );
  }, []);

  const renderItem: ListRenderItem<StoredResult> = useCallback(
    ({ item }) => <ResultBox result={item} onDelete={handleDeleteResult} />,
    [handleDeleteResult]
  );

  const keyExtractor = useCallback((item: StoredResult) => item.fullNameAndId, []);

  const ListEmpty = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No hay resultados</Text>
      </View>
    ),
    []
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.header }]}>
        <Text style={styles.headerText}>Resultados</Text>
      </View>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={resultsArray}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={ListEmpty}
      />
    </SafeAreaView>
  );
});

const styles = {
  container: { flex: 1 },
  header: { padding: 8 },
  headerText: {
    color: colors.white,
    fontSize: 30,
    textAlign: "center" as const,
  },
  listContent: { paddingHorizontal: 16 },
  emptyContainer: {
    backgroundColor: colors.header,
    marginVertical: 16,
    padding: 8,
  },
  emptyText: {
    color: colors.white,
    fontSize: 20,
    textAlign: "center" as const,
  },
};
