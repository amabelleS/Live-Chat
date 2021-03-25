import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

const error = ref(null);

const logout = async () => {
  error.value = null;

  try {
    projectAuth.signOut();
  } catch (err) {
    console.log(error.message);
    error.value = error.message;
  }
};

const useLogout = () => {
  return { logout, error };
};

export default useLogout;
