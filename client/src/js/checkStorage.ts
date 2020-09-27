const storageAvailable = () => {
    const t:string = 'temp_testing_';
    try {
        localStorage.setItem(t,t);
        localStorage.removeItem(t);
        return true;
    } catch(e) {
        return false;
    }
}

export default storageAvailable;