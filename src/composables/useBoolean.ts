import { ref } from "vue";

export function useBoolean(defaultValue = false) {
  const value = ref(defaultValue);

  const setFalse = () => {
    value.value = false;
  };

  const setTrue = () => {
    value.value = true;
  };

  const toggle = () => {
    value.value = !value.value;
  };

  return {
    value,
    setFalse,
    setTrue,
    toggle,
  };
}
