Quiz Component
==============

This is a set of React components that delivered the key functionality of the Blast platform.  Users in various industries, typically front line service employees, were incentivized to log in several times a week to view Announcements and play Quizzes.

These components allow users to play a five question quiz, typically with 30 seconds per question.  At the conclusion of the quiz, their results are tabulated through the server and their score is displayed.  Users can then review all of the questions and their correct answers.  They can also flag any problematic questions.

These components use Redux for state management, and communicate with the server through a REST API.  Here, I also used Immutable JS to ensure immutable values when working with state.