// Function to calculate the duration since a post was created
export const durationSinceCreated = (createdAt) => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diff = now - createdDate;
  
    // Convert milliseconds to seconds, minutes, hours, or days
    if (diff < 1000) {
      return "just now";
    } else if (diff < 60 * 1000) {
      return `${Math.floor(diff / 1000)}s`;
    } else if (diff < 60 * 60 * 1000) {
      return `${Math.floor(diff / (60 * 1000))}m`;
    } else if (diff < 24 * 60 * 60 * 1000) {
      return `${Math.floor(diff / (60 * 60 * 1000))}h`;
    } else {
      return `${Math.floor(diff / (24 * 60 * 60 * 1000))}d`;
    }
  };
  