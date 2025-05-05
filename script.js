// Sample data for problems
const problemsData = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    accuracy: 75,
    tags: ["Array", "Hash Table"],
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    accuracy: 65,
    tags: ["Linked List", "Math"],
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    accuracy: 55,
    tags: ["String", "Sliding Window"],
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    accuracy: 35,
    tags: ["Array", "Binary Search", "Divide and Conquer"],
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    accuracy: 60,
    tags: ["String", "Dynamic Programming"],
  },
  {
    id: 6,
    title: "ZigZag Conversion",
    difficulty: "Medium",
    accuracy: 50,
    tags: ["String"],
  },
  {
    id: 7,
    title: "Reverse Integer",
    difficulty: "Medium",
    accuracy: 45,
    tags: ["Math"],
  },
  {
    id: 8,
    title: "String to Integer (atoi)",
    difficulty: "Medium",
    accuracy: 40,
    tags: ["String", "Math"],
  },
  {
    id: 9,
    title: "Palindrome Number",
    difficulty: "Easy",
    accuracy: 70,
    tags: ["Math"],
  },
  {
    id: 10,
    title: "Regular Expression Matching",
    difficulty: "Hard",
    accuracy: 30,
    tags: ["String", "Dynamic Programming", "Recursion"],
  },
  {
    id: 11,
    title: "Container With Most Water",
    difficulty: "Medium",
    accuracy: 55,
    tags: ["Array", "Two Pointers", "Greedy"],
  },
  {
    id: 12,
    title: "Integer to Roman",
    difficulty: "Medium",
    accuracy: 60,
    tags: ["Math", "String"],
  },
]

// DOM Elements
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
const mobileMenu = document.querySelector(".mobile-menu")
const loginBtn = document.getElementById("login-btn")
const signupBtn = document.getElementById("signup-btn")
const mobileLoginBtn = document.getElementById("mobile-login-btn")
const mobileSignupBtn = document.getElementById("mobile-signup-btn")
const authModal = document.getElementById("auth-modal")
const closeAuthBtn = authModal.querySelector(".close-btn")
const authTabs = document.querySelectorAll(".auth-tab")
const authForms = document.querySelectorAll(".auth-form")
const loginForm = document.getElementById("login-form")
const signupForm = document.getElementById("signup-form")
const problemsTbody = document.getElementById("problems-tbody")
const searchInput = document.getElementById("search-input")
const difficultyFilter = document.getElementById("difficulty-filter")
const solvePanel = document.getElementById("solve-panel")
const closeSolvePanel = document.getElementById("close-solve-panel")
const problemTitle = document.getElementById("problem-title")
const problemDifficulty = document.getElementById("problem-difficulty")
const problemTags = document.getElementById("problem-tags")
const codeEditor = document.getElementById("code-editor")
const languageSelect = document.getElementById("language-select")
const submitSolution = document.getElementById("submit-solution")

// Mobile Menu Toggle
mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("active")
})

// Auth Modal Functions
function openAuthModal(tab = "login") {
  authModal.classList.add("active")
  setActiveTab(tab)
  document.body.style.overflow = "hidden"
}

function closeAuthModal() {
  authModal.classList.remove("active")
  document.body.style.overflow = ""
}

// Set Active Tab
function setActiveTab(tab) {
  authTabs.forEach((t) => {
    if (t.dataset.tab === tab) {
      t.classList.add("active")
    } else {
      t.classList.remove("active")
    }
  })

  authForms.forEach((f) => {
    if (f.classList.contains(`${tab}-form`)) {
      f.classList.add("active")
    } else {
      f.classList.remove("active")
    }
  })
}

// Auth Event Listeners
loginBtn.addEventListener("click", () => {
  window.location.href = 'login.html';
})

signupBtn.addEventListener("click", () => {
  window.location.href = 'signup.html';
})

mobileLoginBtn.addEventListener("click", () => {
  window.location.href = 'login.html';
})

mobileSignupBtn.addEventListener("click", () => {
  window.location.href = 'signup.html';
})

closeAuthBtn.addEventListener("click", closeAuthModal)

authTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setActiveTab(tab.dataset.tab)
  })
})

// Close modal when clicking outside
authModal.addEventListener("click", (e) => {
  if (e.target === authModal) {
    closeAuthModal()
  }
})

// Authentication State Management
let isAuthenticated = false;

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in
  const authToken = localStorage.getItem('authToken');
  isAuthenticated = !!authToken;

  // If not on login/signup pages and not authenticated, redirect to login
  if (!isAuthenticated && !window.location.pathname.includes('login.html') && !window.location.pathname.includes('signup.html')) {
    window.location.href = 'login.html';
  }

  // Update UI based on authentication state
  updateAuthUI();
});

function updateAuthUI() {
  const loginBtn = document.getElementById('login-btn');
  const signupBtn = document.getElementById('signup-btn');
  const mobileLoginBtn = document.getElementById('mobile-login-btn');
  const mobileSignupBtn = document.getElementById('mobile-signup-btn');
  const authButtons = document.querySelector('.auth-buttons');
  const mobileAuthButtons = document.querySelector('.mobile-menu .auth-buttons');

  if (isAuthenticated) {
    // Hide login/signup buttons
    if (loginBtn) loginBtn.style.display = 'none';
    if (signupBtn) signupBtn.style.display = 'none';
    if (mobileLoginBtn) mobileLoginBtn.style.display = 'none';
    if (mobileSignupBtn) mobileSignupBtn.style.display = 'none';

    // Add logout button
    if (authButtons) {
      authButtons.innerHTML = `
        <button id="logout-btn" class="btn btn-glass">Logout</button>
      `;
      document.getElementById('logout-btn').addEventListener('click', handleLogout);
    }

    if (mobileAuthButtons) {
      mobileAuthButtons.innerHTML = `
        <button id="mobile-logout-btn" class="mobile-link">Logout</button>
      `;
      document.getElementById('mobile-logout-btn').addEventListener('click', handleLogout);
    }
  }
}

function handleLogout() {
  localStorage.removeItem('authToken');
  isAuthenticated = false;
  window.location.href = 'login.html';
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = toast.querySelector('.toast-message');
  toastMessage.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

// Update form submission handlers
document.addEventListener('DOMContentLoaded', function() {
  // Input validation for login form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    const inputs = loginForm.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('input', function() {
        if (this.value.trim() === '') {
          this.style.borderColor = 'red';
        } else {
          this.style.borderColor = 'green';
        }
      });
    });

    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      if (email && password) {
        // Show success message
        showToast('Login Successful!');
        
        // Simulate successful login
        setTimeout(() => {
          localStorage.setItem('authToken', 'dummy-token');
          isAuthenticated = true;
          window.location.href = 'index.html';
        }, 2000);
      }
    });
  }

  // Input validation for signup form
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    const inputs = signupForm.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('input', function() {
        if (this.value.trim() === '') {
          this.style.borderColor = 'red';
        } else {
          this.style.borderColor = 'green';
        }
      });
    });

    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      
      if (name && email && password && confirmPassword && password === confirmPassword) {
        // Show success message
        showToast('Signup Successful!');
        
        // Simulate successful signup
        setTimeout(() => {
          localStorage.setItem('authToken', 'dummy-token');
          isAuthenticated = true;
          window.location.href = 'index.html';
        }, 2000);
      }
    });
  }
});

// Render Problems Table
function renderProblemsTable(limit = 5) {
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : ""
  const difficulty = difficultyFilter ? difficultyFilter.value : "All"

  const filteredProblems = problemsData
    .filter((problem) => {
      const matchesSearch =
        problem.title.toLowerCase().includes(searchTerm) ||
        problem.tags.some((tag) => tag.toLowerCase().includes(searchTerm))

      const matchesDifficulty = difficulty === "All" || problem.difficulty === difficulty

      return matchesSearch && matchesDifficulty
    })
    .slice(0, limit)

  if (!problemsTbody) return

  problemsTbody.innerHTML = ""

  filteredProblems.forEach((problem) => {
    const row = document.createElement("tr")

    // ID Cell
    const idCell = document.createElement("td")
    idCell.textContent = problem.id
    row.appendChild(idCell)

    // Title Cell
    const titleCell = document.createElement("td")
    titleCell.textContent = problem.title
    titleCell.style.fontWeight = "500"
    titleCell.style.color = "white"
    row.appendChild(titleCell)

    // Difficulty Cell
    const difficultyCell = document.createElement("td")
    const difficultySpan = document.createElement("span")
    difficultySpan.textContent = problem.difficulty
    difficultySpan.classList.add("difficulty")
    difficultySpan.classList.add(problem.difficulty.toLowerCase())
    difficultyCell.appendChild(difficultySpan)
    row.appendChild(difficultyCell)

    // Accuracy Cell
    const accuracyCell = document.createElement("td")
    const accuracyContainer = document.createElement("div")
    accuracyContainer.classList.add("accuracy-container")

    const accuracyBar = document.createElement("div")
    accuracyBar.classList.add("accuracy-bar")

    const accuracyFill = document.createElement("div")
    accuracyFill.classList.add("accuracy-fill")
    accuracyFill.style.width = `${problem.accuracy}%`

    const accuracyValue = document.createElement("span")
    accuracyValue.classList.add("accuracy-value")
    accuracyValue.textContent = `${problem.accuracy}%`

    accuracyBar.appendChild(accuracyFill)
    accuracyContainer.appendChild(accuracyBar)
    accuracyContainer.appendChild(accuracyValue)
    accuracyCell.appendChild(accuracyContainer)
    row.appendChild(accuracyCell)

    // Tags Cell
    const tagsCell = document.createElement("td")
    problem.tags.forEach((tag) => {
      const tagSpan = document.createElement("span")
      tagSpan.classList.add("tag")
      tagSpan.textContent = tag
      tagsCell.appendChild(tagSpan)
    })
    row.appendChild(tagsCell)

    // Action Cell
    const actionCell = document.createElement("td")
    actionCell.style.textAlign = "right"

    const solveBtn = document.createElement("button")
    solveBtn.classList.add("solve-btn")
    solveBtn.textContent = "Solve"

    const arrowIcon = document.createElement("i")
    arrowIcon.classList.add("fa-solid", "fa-arrow-right")
    solveBtn.appendChild(arrowIcon)

    solveBtn.addEventListener("click", () => {
      openSolvePanel(problem)
    })

    actionCell.appendChild(solveBtn)
    row.appendChild(actionCell)

    problemsTbody.appendChild(row)
  })
}

// Filter and Search
if (searchInput) {
  searchInput.addEventListener("input", renderProblemsTable)
}

if (difficultyFilter) {
  difficultyFilter.addEventListener("change", renderProblemsTable)
}

// Solve Panel Functions
function openSolvePanel(problem) {
  solvePanel.classList.add("active")
  document.body.style.overflow = "hidden"

  // Set problem details
  problemTitle.textContent = problem.title
  problemDifficulty.textContent = problem.difficulty
  problemDifficulty.className = `difficulty ${problem.difficulty.toLowerCase()}`

  // Set problem tags
  problemTags.innerHTML = ""
  problem.tags.forEach((tag, index) => {
    const tagSpan = document.createElement("span")
    tagSpan.classList.add("problem-tag")
    tagSpan.textContent = tag
    if (index < problem.tags.length - 1) {
      tagSpan.textContent += ","
    }
    problemTags.appendChild(tagSpan)
  })

  // Set default code based on language
  setDefaultCode(languageSelect.value)
}

function closeSolvePanelFunc() {
  solvePanel.classList.remove("active")
  document.body.style.overflow = ""
}

// Close solve panel
closeSolvePanel.addEventListener("click", closeSolvePanelFunc)

// Close panel when clicking outside
solvePanel.addEventListener("click", (e) => {
  if (e.target === solvePanel) {
    closeSolvePanelFunc()
  }
})

// Set default code based on language
function setDefaultCode(language) {
  let defaultCode = ""

  switch (language) {
    case "python":
      defaultCode = "# Write your solution here\n\ndef two_sum(nums, target):\n    # Your code here\n    pass\n"
      break
    case "javascript":
      defaultCode = "// Write your solution here\n\nfunction twoSum(nums, target) {\n    // Your code here\n}\n"
      break
    case "java":
      defaultCode =
        "// Write your solution here\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return null;\n    }\n}\n"
      break
    case "cpp":
      defaultCode =
        "// Write your solution here\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Your code here\n    }\n};\n"
      break
  }

  codeEditor.value = defaultCode
}

// Language change event
languageSelect.addEventListener("change", (e) => {
  setDefaultCode(e.target.value)
})

// Submit solution
submitSolution.addEventListener("click", () => {
  // In a real app, this would send the solution to the server
  alert("Solution submitted successfully!")
  
  // Save submission to local storage
  const submission = {
    id: Date.now(),
    problem: problemTitle.textContent,
    status: Math.random() > 0.3 ? "Accepted" : "Wrong Answer",
    runtime: Math.floor(Math.random() * 100) + "ms",
    memory: (Math.random() * 20).toFixed(1) + "MB",
    language: languageSelect.value,
    code: codeEditor.value
  }
})

// Event Listeners for Auth Buttons
document.addEventListener('DOMContentLoaded', function() {
  const loginBtn = document.getElementById('login-btn');
  const signupBtn = document.getElementById('signup-btn');
  const mobileLoginBtn = document.getElementById('mobile-login-btn');
  const mobileSignupBtn = document.getElementById('mobile-signup-btn');

  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }

  if (signupBtn) {
    signupBtn.addEventListener('click', () => {
      window.location.href = 'signup.html';
    });
  }

  if (mobileLoginBtn) {
    mobileLoginBtn.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }

  if (mobileSignupBtn) {
    mobileSignupBtn.addEventListener('click', () => {
      window.location.href = 'signup.html';
    });
  }
});
