# AI Writing Assistant

``
## 🛠️ Technologies Used

- **Next.js** - React framework for server-side rendering and API integration.
- **Tailwind CSS** - Utility-first CSS framework for styling.
- **OpenAI API SDK** - To generate responses based on user input.

---

## 🖥️ Setup and Installation
Follow these steps to set up the project locally:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd writing-assistant
   ```
2. **Install Dependencies:** Ensure you have pnpm installed, then run:
   ```bash
    pnpm install
   ```
3. **Set Up OpenAI API Key::**
   1. Create an OpenAI account and generate an API key by visiting the OpenAI API Key page.
   2. Create an .env.local and add OPENAI_API with your actual key:
   ```bash
   OPENAI_API_KEY=YOUR_OPENAI_API_KEY
   ```
4. **Run the Development Server:** Start the Next.js development server
   ```bash
   pnpm install
   ```

## 🌐 Deployment

To deploy this application on **Vercel**, follow these steps:

1. **Login to Vercel**: Go to [vercel.com](https://vercel.com/) and log in with your GitHub account.
2. **Import Your Project**: Select your GitHub repository and configure the project.
3. **Set Environment Variables**: Add `OPENAI_API_KEY` in the project settings with your OpenAI API key.
4. **Deploy**: Vercel will automatically build and deploy your project. Once complete, your app will be live at the provided URL.

