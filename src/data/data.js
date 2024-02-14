import users from './users';
const postsData = [
  {
    caption: "Beautiful sunset at the beach! 🌅 #nature #sunset",
    images: [{ url: getRandomImageUrl() }],
    user: users[Math.floor(Math.random() * users.length)],
    created_at: "2024-02-13T18:45:00Z",
    count: { liked_by: 102 },
    comments: generateRandomComments()
  },
  {
    caption: "Exploring the city streets. 🏙️ #citylife #exploring",
    images: [{ url: getRandomImageUrl() }],
    user: users[Math.floor(Math.random() * users.length)],
    created_at: "2024-02-12T10:15:00Z",
    count: { liked_by: 85 },
    comments: generateRandomComments()
  },
  {
    caption: "Delicious homemade pizza! 🍕 #foodie #homemade",
    images: [{ url: getRandomImageUrl() }],
    user: users[Math.floor(Math.random() * users.length)],
    created_at: "2024-02-11T15:30:00Z",
    count: { liked_by: 120 },
    comments: generateRandomComments()
  }
];

function generateRandomComments() {
  const randomComments = [
    "Wow, amazing!",
    "Beautiful!",
    "Love it!",
    "Great shot!",
    "Fantastic!",
    "Awesome!",
    "So cool!",
    "Incredible!"
  ];

  const comments = [];
  const numComments = Math.floor(Math.random() * 5) + 1;

  for (let i = 0; i < numComments; i++) {
    const randomComment = randomComments[Math.floor(Math.random() * randomComments.length)];
    comments.push(randomComment);
  }

  return comments;
}

function getRandomImageUrl() {
  var randomImage = [
    "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/142497/pexels-photo-142497.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.unsplash.com/photo-1543877087-ebf71fde2be1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1501265976582-c1e1b0bbaf63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
  ];

  var number = Math.floor(Math.random() * randomImage.length);

  return randomImage[number];
}

export default postsData;
