import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Divider,
} from '@mui/material';
import { ContactButtons } from '../components/molecules';

const ContactButtonsDemo: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" gutterBottom align="center" sx={{ fontWeight: 700, mb: 6 }}>
        ContactButtons Component Demo
      </Typography>

      <Grid container spacing={4}>
        {/* Basic Usage */}
        <Grid item xs={12}>
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              Basic Usage
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Default contact buttons with standard styling and messages.
            </Typography>
            <ContactButtons />
            <Divider sx={{ my: 3 }} />
            <Box sx={{ backgroundColor: 'grey.100', p: 2, borderRadius: 1 }}>
              <code>{`<ContactButtons />`}</code>
            </Box>
          </Paper>
        </Grid>

        {/* Custom Messages */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, borderRadius: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Custom Messages
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Customize button text and WhatsApp message.
            </Typography>
            <ContactButtons
              phoneText="Book Inspection"
              whatsappText="Get Quote"
              whatsappMessage="Hello! I need a quote for vehicle valuation services."
            />
            <Divider sx={{ my: 2 }} />
            <Box sx={{ backgroundColor: 'grey.100', p: 2, borderRadius: 1, fontSize: '0.8rem' }}>
              <pre>{`<ContactButtons
  phoneText="Book Inspection"
  whatsappText="Get Quote"
  whatsappMessage="Hello! I need a quote for vehicle valuation services."
/>`}</pre>
            </Box>
          </Paper>
        </Grid>

        {/* Single Button Variants */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, borderRadius: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Single Button Variants
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Show only phone or WhatsApp button.
            </Typography>
            <Box sx={{ mb: 2 }}>
              <ContactButtons variant="phone-only" />
            </Box>
            <ContactButtons variant="whatsapp-only" />
            <Divider sx={{ my: 2 }} />
            <Box sx={{ backgroundColor: 'grey.100', p: 2, borderRadius: 1, fontSize: '0.8rem' }}>
              <pre>{`<ContactButtons variant="phone-only" />
<ContactButtons variant="whatsapp-only" />`}</pre>
            </Box>
          </Paper>
        </Grid>

        {/* Different Sizes */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, borderRadius: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Different Sizes
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Adjust button sizes for different contexts.
            </Typography>
            <Box sx={{ mb: 2 }}>
              <ContactButtons size="small" />
            </Box>
            <Box sx={{ mb: 2 }}>
              <ContactButtons size="medium" />
            </Box>
            <ContactButtons size="large" />
            <Divider sx={{ my: 2 }} />
            <Box sx={{ backgroundColor: 'grey.100', p: 2, borderRadius: 1, fontSize: '0.8rem' }}>
              <pre>{`<ContactButtons size="small" />
<ContactButtons size="medium" />
<ContactButtons size="large" />`}</pre>
            </Box>
          </Paper>
        </Grid>

        {/* Custom Styling */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, borderRadius: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Custom Styling
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Override default styles and spacing.
            </Typography>
            <ContactButtons
              direction="column"
              spacing={3}
              buttonSx={{
                borderRadius: 1,
                textTransform: 'uppercase',
                fontWeight: 'bold',
              }}
              justifyContent="center"
            />
            <Divider sx={{ my: 2 }} />
            <Box sx={{ backgroundColor: 'grey.100', p: 2, borderRadius: 1, fontSize: '0.75rem' }}>
              <pre>{`<ContactButtons
  direction="column"
  spacing={3}
  buttonSx={{
    borderRadius: 1,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  }}
  justifyContent="center"
/>`}</pre>
            </Box>
          </Paper>
        </Grid>

        {/* Callbacks */}
        <Grid item xs={12}>
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              With Callbacks
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Add custom logic before the default actions.
            </Typography>
            <ContactButtons
              onPhoneClick={() => console.log('Phone button clicked - custom logic here')}
              onWhatsAppClick={() => console.log('WhatsApp button clicked - custom logic here')}
            />
            <Divider sx={{ my: 3 }} />
            <Box sx={{ backgroundColor: 'grey.100', p: 2, borderRadius: 1 }}>
              <pre>{`<ContactButtons
  onPhoneClick={() => console.log('Phone button clicked - custom logic here')}
  onWhatsAppClick={() => console.log('WhatsApp button clicked - custom logic here')}
/>`}</pre>
            </Box>
          </Paper>
        </Grid>

        {/* Props Documentation */}
        <Grid item xs={12}>
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              Props Documentation
            </Typography>
            <Box sx={{ overflow: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f5f5f5' }}>
                    <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #ddd' }}>Prop</th>
                    <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #ddd' }}>Type</th>
                    <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #ddd' }}>Default</th>
                    <th style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #ddd' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { prop: 'size', type: "'small' | 'medium' | 'large'", default: "'large'", desc: 'Size of the buttons' },
                    { prop: 'variant', type: "'both' | 'phone-only' | 'whatsapp-only'", default: "'both'", desc: 'Which buttons to show' },
                    { prop: 'phoneText', type: 'string', default: "'Talk To Us'", desc: 'Custom text for phone button' },
                    { prop: 'whatsappText', type: 'string', default: "'Chat with us'", desc: 'Custom text for WhatsApp button' },
                    { prop: 'whatsappMessage', type: 'string', default: "'Hello! I would like to inquire about your services.'", desc: 'Custom WhatsApp message' },
                    { prop: 'fullWidthOnMobile', type: 'boolean', default: 'true', desc: 'Whether buttons should be full width on mobile' },
                    { prop: 'buttonSx', type: 'object', default: '{}', desc: 'Custom styling for buttons' },
                    { prop: 'onPhoneClick', type: '() => void', default: 'undefined', desc: 'Callback before phone action' },
                    { prop: 'onWhatsAppClick', type: '() => void', default: 'undefined', desc: 'Callback before WhatsApp action' },
                  ].map((row, index) => (
                    <tr key={index}>
                      <td style={{ padding: 12, borderBottom: '1px solid #eee', fontFamily: 'monospace', backgroundColor: '#f9f9f9' }}>
                        {row.prop}
                      </td>
                      <td style={{ padding: 12, borderBottom: '1px solid #eee', fontFamily: 'monospace' }}>
                        {row.type}
                      </td>
                      <td style={{ padding: 12, borderBottom: '1px solid #eee', fontFamily: 'monospace' }}>
                        {row.default}
                      </td>
                      <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>
                        {row.desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactButtonsDemo;
