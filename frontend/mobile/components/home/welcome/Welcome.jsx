import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native'
import { useRouter } from 'expo-router'

import styles from './welcome.style'
import {icons, SIZES} from '../../../constants'

const WELCOME_SHORTCUT_BUTTONS = ["Chope", "Burple"];

const Welcome = () => {
  const [activeTabType, setActiveTabType] = useState("Chope")

  return (
    <View>

      <View style={styles.container}>
        <Text style={styles.welcomeMessage}>Welcome to veekly bobangs</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=""
            onChange={() => {}}
            placeholder='Search...'
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>

      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={WELCOME_SHORTCUT_BUTTONS}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeTabType, item)}
              onPress={() => {
                setActiveTabType(item);
                router.push(`/search/${item}`)
              }}
            >
              <Text style={styles.tabText(activeTabType, item)}>{ item }</Text>
            </TouchableOpacity>
          )}  
          keyExtractor={ item => item }
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>

    </View>
  )
}

export default Welcome