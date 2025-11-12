# Debug connection issues

## Check these URLs in your browser:

### Backend Health Check
- Production: https://your-actual-railway-url.up.railway.app/health
- Development: http://localhost:8000/health

### Frontend Environment
- Check browser console for API_URL value
- Verify REACT_APP_API_URL environment variable

## Common Issues:

1. **Wrong Railway URL**: Make sure you're using the correct Railway deployment URL
2. **Environment Variables**: Vercel needs REACT_APP_API_URL set correctly
3. **CORS Issues**: Backend logs will show CORS errors if frontend URL isn't allowed
4. **Network Errors**: Check browser network tab for failed requests

## Debugging Steps:

1. Open browser dev tools on your deployed frontend
2. Check Console tab for API_URL value
3. Check Network tab when login fails
4. Verify backend is responding at /health endpoint
