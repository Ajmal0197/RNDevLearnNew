// src/MainApp.js
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from './api/authApi';
import {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
  useLazyGetPostsQuery,
  useUpdatePostMutation,
} from './api/postsApi';
import { useGetUserProfileQuery } from './api/usersApi';
import { logout } from './features/auth/authSlice';

const MainApp = () => {
  const [newPostTitle, setNewPostTitle] = useState('');
  const [page, setPage] = useState(1);
  const [postsData, setPostsData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  // Login mutation
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();

  // Fetch user profile when token is available
  const { data: userProfile, refetch: refetchUserProfile } = useGetUserProfileQuery(undefined, {
    skip: !token,
  });

  // Fetch paginated posts
  const {
    data: posts,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetPostsQuery({ page, limit: 10 }); // The useQuery hook is used when you want to fetch data on screen load. For example fetch userprofile on profile screen.
  // Use the lazy query for refresh to directly fetch page 1
  const [triggerFetchFirstPage, { data: lazyData }] = useLazyGetPostsQuery(); // useLazyquery is used when you want to control over the api calling, like on button click.

  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  useEffect(() => {
    if (posts) {
      setPostsData((prevData) => (page === 1 ? posts : [...prevData, ...posts]));
    }
  }, [posts, page]);

  // Login handler
  const handleLogin = async () => {
    try {
      const credentials = { username: 'emilys', password: 'emilyspass' };
      await login(credentials);
      console.log('userProfile', userProfile);
      refetchUserProfile();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setPage(1); // Reset the page to 1 for the next scrolls
    setPostsData([]); // Clear the data to avoid duplications

    // Trigger the first page fetch explicitly
    const { data } = await triggerFetchFirstPage({ page: 1, limit: 10 });

    if (data) {
      setPostsData(data); // Set the posts data to the first page's results
    }

    setRefreshing(false);
  };

  // Create a new post, add it to the top, and refetch the list
  const handleCreatePost = async () => {
    if (newPostTitle) {
      const { data: newPost } = await createPost({ title: newPostTitle, body: 'New post content' });
      setNewPostTitle('');
      setPostsData((prevData) => [newPost, ...prevData]);
      refetch();
    }
  };

  // Update an existing post and add "HASAN" to its title
  const handleUpdatePost = async (post) => {
    const { data: updatedPost } = await updatePost({
      id: post.id,
      title: `${post.title} HASAN`,
    });
    setPostsData((prevData) =>
      prevData.map((item) => (item?.id === updatedPost?.id ? updatedPost : item))
    );
  };

  // Delete a post and remove it from the UI immediately
  const handleDeletePost = async (id) => {
    await deletePost(id);
    setPostsData((prevData) => prevData.filter((post) => post.id !== id));
  };

  // Load more posts for infinite scrolling
  const loadMorePosts = () => {
    if (!isFetching) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  if (isLoading && page === 1) return <Text>Loading...</Text>;
  if (isError) return <Text>Error fetching posts.</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        <Button title="Login" onPress={handleLogin} disabled={isLoggingIn} />
        {userProfile && <Button title="Show Profile" onPress={toggleModal} />}
      </View>
      <TextInput
        placeholder="New post title"
        value={newPostTitle}
        onChangeText={setNewPostTitle}
        style={styles.input}
      />
      <Button title="Add Post" onPress={handleCreatePost} />

      <FlatList
        data={postsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text>{item.title}</Text>
            <Button title="Update" onPress={() => handleUpdatePost(item)} />
            <Button title="Delete" onPress={() => handleDeletePost(item.id)} />
          </View>
        )}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetching ? <ActivityIndicator color="red" /> : null}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      />

      {/* Profile Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={toggleModal}
        transparent
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {userProfile ? (
              <>
                <Text style={styles.modalTitle}>User Profile</Text>
                <Text>Username: {userProfile.username}</Text>
                <Text>Email: {userProfile.email}</Text>
                <Button title="Close" onPress={toggleModal} />
                <Button
                  title="Logout"
                  onPress={() => {
                    toggleModal();
                    dispatch(logout());
                  }}
                />
              </>
            ) : (
              <Text>Loading Profile...</Text>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: 'cyan' },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8, paddingHorizontal: 8 },
  post: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'pink',
    marginBottom: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
});

export default MainApp;
