import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import ScreenContainer from '../components/ui/ScreenContainer';
import { ScreenHeaderWithBack } from '../components/ui/ScreenHeaderWithBack';
import { allLessonsData } from '../data/lessonData';
import { Play } from 'phosphor-react-native';

const VideoPlayer = ({ videoId }) => (
    <View style={styles.videoPlayer}>
        <Image 
            source={{ uri: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` }} 
            style={styles.videoThumbnail}
        />
        <View style={styles.playButtonOverlay}>
            <Play color="#FFFFFF" size={48} weight="fill" />
        </View>
    </View>
);

const LessonDetailScreen = ({ navigation, route }) => {
    const { lessonId } = route.params;
    const [lessonData, setLessonData] = useState(null);

    useEffect(() => {
        if (allLessonsData[lessonId]) {
            setLessonData(allLessonsData[lessonId]);
        }
    }, [lessonId]);

    if (!lessonData) return <ScreenContainer><ScreenHeaderWithBack title="Loading..." navigation={navigation} /></ScreenContainer>;

    const { type, title, content } = lessonData;

    const renderContent = () => {
        switch (type) {
            case 'video':
                return (
                    <View>
                        <VideoPlayer videoId={content.videoId} />
                        <Text style={styles.description}>{content.description}</Text>
                    </View>
                );
            case 'text':
            case 'text-image':
                return content.body.map((item, index) => {
                    if (item.type === 'heading') {
                        return <Text key={index} style={styles.heading}>{item.value}</Text>;
                    }
                    if (item.type === 'image') {
                        return <Image key={index} source={{ uri: item.value }} style={styles.bodyImage} />;
                    }
                    return <Text key={index} style={styles.bodyText}>{item.value}</Text>;
                });
            default:
                return <Text style={styles.bodyText}>Unsupported lesson format.</Text>;
        }
    };

    return (
        <ScreenContainer>
            <ScreenHeaderWithBack title="Lesson" navigation={navigation} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    {content.headerImage && <Image source={{ uri: content.headerImage }} style={styles.headerImage} />}
                    <View style={styles.headerOverlay} />
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.contentContainer}>
                    {renderContent()}
                </View>
                <TouchableOpacity style={styles.quizButton}>
                    <Text style={styles.quizButtonText}>Take the Quiz</Text>
                </TouchableOpacity>
            </ScrollView>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        marginBottom: 24,
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
    },
    headerImage: {
        width: '100%',
        height: 200,
    },
    headerOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    title: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    contentContainer: {
        paddingHorizontal: 8,
    },
    videoPlayer: {
        width: '100%',
        aspectRatio: 16 / 9,
        backgroundColor: '#000',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    videoThumbnail: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
    },
    playButtonOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    description: {
        color: '#8D8D93',
        fontSize: 16,
        lineHeight: 24,
    },
    heading: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 24,
        marginBottom: 12,
    },
    bodyText: {
        color: '#EAEAEA',
        fontSize: 17,
        lineHeight: 28,
        marginBottom: 16,
    },
    bodyImage: {
        width: '100%',
        height: 200,
        borderRadius: 16,
        marginVertical: 16,
    },
    quizButton: {
        backgroundColor: '#8A63D2',
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: 'center',
        marginVertical: 32,
    },
    quizButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LessonDetailScreen;