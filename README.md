# Eternal Memories - Obituary Website

A comprehensive obituary website built with Next.js, featuring modern design, authentication, and community engagement.

## Features

- **Modern Homepage** with hero section, features, recent obituaries, and testimonials
- **Custom Authentication** using JWT and bcrypt
- **Obituary Management** with rich text editor and CRUD operations
- **Search & Filter** functionality for obituaries
- **Comment System** for community engagement
- **Family Dashboard** for managing obituaries
- **Contact Form** with EmailJS integration
- **Responsive Design** with Tailwind CSS

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory and add:

```env
# MongoDB Connection
# Replace with your actual MongoDB connection string
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/obituary-website
# For local MongoDB: mongodb://localhost:27017/obituary-website
MONGODB_URI=your_mongodb_connection_string_here

# JWT Secret (change this in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 3. MongoDB Setup

**Option 1: MongoDB Atlas (Recommended)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and create a free account
2. Create a new cluster
3. Create a database user with read/write permissions
4. Get your connection string from the "Connect" button
5. Replace `your_mongodb_connection_string_here` in `.env.local` with your Atlas connection string

**Option 2: Local MongoDB**
1. Install MongoDB locally on your machine
2. Start the MongoDB service
3. Replace `your_mongodb_connection_string_here` in `.env.local` with `mongodb://localhost:27017/obituary-website`

**Important**: The application will not start without a valid MongoDB connection string.

### 4. EmailJS Setup

1. Go to [EmailJS](https://www.emailjs.com/) and create an account
2. Create a new service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{phone}}` - Sender's phone (optional)
   - `{{subject}}` - Message subject
   - `{{message}}` - Message content
   - `{{to_name}}` - Recipient name (Eternal Memories Support)

4. Get your Service ID, Template ID, and Public Key from EmailJS dashboard
5. Update the EmailJS variables in your `.env.local` file

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## EmailJS Template Example

Here's a sample email template you can use in EmailJS:

**Subject:** New Contact Form Submission - {{subject}}

**Body:**
```
Hello {{to_name}},

You have received a new message from the Eternal Memories contact form.

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Subject: {{subject}}

Message:
{{message}}

Please respond to this inquiry as soon as possible.

Best regards,
Eternal Memories Website
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Family dashboard
│   ├── obituaries/        # Obituary pages
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   ├── obituary/         # Obituary-specific components
│   └── ui/               # UI components
├── lib/                  # Utility functions
├── models/               # MongoDB models
└── middleware.ts         # Authentication middleware
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **MongoDB & Mongoose** - Database
- **JWT & bcrypt** - Authentication
- **EmailJS** - Contact form emails
- **React Quill** - Rich text editor
- **Lucide React** - Icons
- **Shadcn/ui** - UI components

## License

This project is licensed under the MIT License.