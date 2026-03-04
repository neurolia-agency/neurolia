# Interactive 3D Animated Portfolio

A modern, interactive portfolio website built with Next.js,

https://github.com/himanshu8443/3D-Portfolio/assets/99420590/6f11c9db-5f32-41e8-94f9-cbf52be8553e

## Tech Stack

- **Framework:** Next.js 16
- **3D Graphics:** Three.js, React Three Fiber, React Three Drei
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion, GSAP
- **UI Components:** React Icons, React Type Animation
- **Smooth Scrolling:** Lenis, Locomotive Scroll

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 18.0 or higher)
- npm, yarn, or pnpm package manager

## Installation

1. Clone the repository:

```bash
git clone https://github.com/himanshu8443/Portfolio.git
cd portfolio
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables (if needed for EmailJS):
   Create a `.env.local` file in the root directory and add your EmailJS credentials:

```
EMAILJS_SERVICE_ID=your_service_id (get it from www.emailjs.com)
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key
```

## Running the Project

### Development Mode

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Production Build

Build the application for production:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

Start the production server:

```bash
npm start
# or
yarn start
# or
pnpm start
```

## Project Structure

```
portfolio/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── layout.js     # Root layout
│   │   ├── page.js       # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── canvas/       # 3D canvas components
│   │   ├── hoc/          # Higher-order components
│   │   └── ...           # Other components
│   ├── constants/        # Constants and configuration
│   ├── assets/           # Images and static assets
│   └── utils/            # Utility functions
├── public/               # Public static files
└── ...                   # Config files
```

## Customization

1. **Update Personal Information:** Edit [src/constants/constants.js](src/constants/constants.js) to add your personal details, projects, and experience.

2. **Add/Remove Sections:** Modify the [src/app/page.js](src/app/page.js) file to include or exclude sections such as About, Projects, Skills, Testimonials, Experience, and Contact.

3. **Modify Components:** Customize individual components in the [src/components](src/components) directory.

4. **Styling:** Adjust colors and styles in [tailwind.config.js](tailwind.config.js) and [src/app/globals.css](src/app/globals.css).

## License

This project is open source and available under the MIT License.

## Contact

For questions or support, please open an issue in the GitHub repository.
