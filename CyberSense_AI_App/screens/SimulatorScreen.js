import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ui/ScreenContainer';
import ScreenHeader from '../components/ui/ScreenHeader';
import EmailListItem from '../components/lists/EmailListItem';
import { FunnelSimple } from 'phosphor-react-native';
import { allEmailsData } from '../data/lessonData'; 

const emailDataArray = Object.values(allEmailsData);

const SimulatorScreen = () => {
  return (
    <ScreenContainer>
        <ScreenHeader title="Phishing Simulator" icon={<FunnelSimple color="#8D8D93" size={26} weight="bold" />} />
        <FlatList
            data={emailDataArray}
            renderItem={({ item }) => <EmailListItem {...item} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
    separator: {
        height: 8,
    }
});

export default SimulatorScreen;