import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import Actions from './actions';
import Selectors from './selectors';
import { State, User } from './types';
import theme from './theme';

interface HomeProps {
  users: User[];
  fetchUsers: () => void;
  fetchUserPosts: (userId: number) => void;
}

export const Home = React.memo(({
  users,
  fetchUsers,
  fetchUserPosts
}: HomeProps): React.ReactElement => {
  const [userIndex, setUserIndex] = useState(0);
  const user = users[userIndex];

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (user) fetchUserPosts(user.id);
  }, [user]);

  const next = () => {
    const nextUserIndex = userIndex === users.length - 1 ? 0 : userIndex + 1;
    setUserIndex(nextUserIndex);
  };

  const prev = () => {
    const prevUserIndex = userIndex === 0 ? users.length - 1 : userIndex - 1;
    setUserIndex(prevUserIndex);
  };

  if (!users.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.column}>
          <Text style={styles.h1}>{user.name}</Text>
          <Text style={styles.s1}>{user.website}</Text>
        </View>
        <View style={styles.column}>
          <View style={styles.row}>
            <TouchableOpacity onPress={prev}>
              <Ionicons style={styles.arrowIcon} name="md-arrow-back" size={32} color={theme.colors.accent} />
            </TouchableOpacity>
            <TouchableOpacity onPress={next}>
              <Ionicons style={styles.arrowIcon} name="md-arrow-forward" size={32} color={theme.colors.accent} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView>
        {user.posts && user.posts.length > 0 && user.posts.map(post => (
          <View key={post.id} style={styles.postContainer}>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postText} numberOfLines={2}>{post.body}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
});

export default connect((state: State) => ({
  users: Selectors.userData(state),
}), dispatch => ({
  fetchUsers: () => dispatch(Actions.users.fetchUsers.trigger()),
  fetchUserPosts: (userId) => dispatch(Actions.users.fetchUserPosts.trigger(userId))
}))(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: 'center'
  },
  topBar: {
    width: '100%',
    padding: theme.space.lg,
    backgroundColor: theme.colors.contentBg,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  column: {},
  row: { flexDirection: 'row' },
  arrowIcon: {
    marginVertical: 0,
    marginHorizontal: theme.space.md
  },
  h1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.basic,
  },
  s1: {
    fontSize: 12,
    color: theme.colors.basic200
  },
  postContainer: {
    flex: 1,
    padding: theme.space.lg
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.basic,
  },
  postText: {
    fontSize: 12,
    color: theme.colors.basic
  }
})
