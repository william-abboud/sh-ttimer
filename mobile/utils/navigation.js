const goTo = (navigation) => (screen) => {
  navigation.navigate(screen);
};

export const goToTimer = (navigation) => goTo(navigation)("Timer");
export const goToHome = (navigation) => goTo(navigation)("Home");
export const goToEarning = (navigation) => goTo(navigation)("Earning");
