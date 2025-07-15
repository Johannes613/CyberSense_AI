import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import ScreenContainer from '../components/ui/ScreenContainer';
import { ScreenHeaderWithBack } from '../components/ui/ScreenHeaderWithBack';
import ReportCard from '../components/reporting/ReportCard';
import { Shield, Globe, Scales } from 'phosphor-react-native'; 

const reportingAgencies = [
  {
    id: '1',
    logo: <Shield color="#34C759" size={60} weight="bold" />,
    title: "UAE eCrime Portal",
    description: "The official platform for reporting all types of electronic crimes within the United Arab Emirates, including hacking, fraud, and online threats.",
    url: "https://www.dubaipolice.gov.ae/wps/portal/home/services/individualservicescontent/cybercrime",
  },
  {
    id: '2',
    logo: <Scales color="#F2994A" size={60} weight="bold" />,
    title: "INTERPOL",
    description: "Report international cybercrime to the world's largest international police organization. Useful for crimes that cross borders.",
    url: "https://www.interpol.int/en/How-we-work/Cybercrime/Cybercrime-public-awareness",
  },
  {
    id: '3',
    logo: <Globe color="#4A90E2" size={60} weight="bold" />,
    title: "IC3 (Internet Crime Complaint Center)",
    description: "A partnership between the FBI and other agencies to receive, develop, and refer criminal complaints regarding cyber crime.",
    url: "https://www.ic3.gov/",
  },
];

const ReportScreen = ({ navigation }) => {
  return (
    <ScreenContainer>
      <ScreenHeaderWithBack title="Report Cybersecurity Issues" navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {reportingAgencies.map((agency) => (
          <ReportCard
            key={agency.id}
            logo={agency.logo}
            title={agency.title}
            description={agency.description}
            url={agency.url}
          />
        ))}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 10,
    paddingBottom: 20,
  },
});

export default ReportScreen;