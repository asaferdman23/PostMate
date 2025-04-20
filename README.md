# PostMate

A modern, serverless email client application built with React and AWS services. PostMate provides a clean, intuitive interface for managing emails efficiently.

## Features

- 📨 Email Management
  - Streamlined inbox, sent, and draft views
  - Intuitive email composition interface
  - Real-time email synchronization
  - Advanced search capabilities
  
- ⚡ Serverless Architecture
  - AWS DynamoDB for reliable data storage
  - AWS S3 for file attachments
  - Scalable and maintenance-free backend
  
- 🎯 User Experience
  - Clean, modern interface
  - Responsive design for all devices
  - Quick email preview and selection
  - Intuitive navigation system

## Tech Stack

- **Frontend**: React.js with Vite
- **Routing**: React Router v6
- **Backend**: AWS Serverless Architecture
  - DynamoDB for data storage
  - S3 for file storage
- **Styling**: Modern CSS3

## Project Structure
postmate/
├── src/
│ ├── assets/ # Static assets and styles
│ ├── cmps/ # Reusable components
│ ├── pages/ # Page components
│ ├── services/ # AWS and utility services
│ └── App.jsx # Root component
```

## Setup and Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd postmate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file:
   ```env
   VITE_AWS_REGION=your_region
   VITE_AWS_ACCESS_KEY_ID=your_access_key
   VITE_AWS_SECRET_ACCESS_KEY=your_secret_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## AWS Configuration

### DynamoDB Setup
- Table name: 'emails'
- Primary key: 'emailId'
- Required IAM permissions for CRUD operations

### S3 Setup
- Bucket configuration for file storage
- Appropriate CORS settings
- Security policies

## Key Components

### Email Preview
- Streamlined email list view
- Quick actions (select, star, delete)
- Preview of email content
- Smart date formatting

### Email Composer
- Rich text composition
- File attachment support
- Auto-save drafts
- Quick send functionality

## AWS Integration

### DynamoDB Integration
- Email storage and retrieval
- Status management
- User data persistence

### S3 Integration
- Secure file storage
- Efficient attachment handling

## Development Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Production preview

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/NewFeature`)
3. Commit changes (`git commit -m 'Add NewFeature'`)
4. Push to branch (`git push origin feature/NewFeature`)
5. Create Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built with modern React practices
- Powered by AWS serverless architecture
- Inspired by modern email clients