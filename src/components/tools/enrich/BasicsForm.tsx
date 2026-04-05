import type { Basics, Location } from '@vitaeflow/sdk';
import FormField from './FormField';

interface BasicsFormProps {
  basics: Partial<Basics>;
  onChange: (basics: Partial<Basics>) => void;
}

export default function BasicsForm({ basics, onChange }: BasicsFormProps) {
  const update = (key: keyof Basics, value: string) => {
    onChange({ ...basics, [key]: value || undefined });
  };

  const updateLocation = (key: keyof Location, value: string) => {
    const loc = { ...basics.location, [key]: value || undefined };
    const hasValue = Object.values(loc).some(Boolean);
    onChange({ ...basics, location: hasValue ? loc : undefined });
  };

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-bold text-ink">Basics</h3>

      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <FormField label="Given name" name="givenName" value={basics.givenName ?? ''} onChange={(v) => update('givenName', v)} required placeholder="Marie" />
        <FormField label="Family name" name="familyName" value={basics.familyName ?? ''} onChange={(v) => update('familyName', v)} required placeholder="Laurent" />
      </div>

      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <FormField label="Email" name="email" type="email" value={basics.email ?? ''} onChange={(v) => update('email', v)} required placeholder="marie@example.com" />
        <FormField label="Headline" name="headline" value={basics.headline ?? ''} onChange={(v) => update('headline', v)} placeholder="Full Stack Developer" />
      </div>

      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <FormField label="Phone" name="phone" type="tel" value={basics.phone ?? ''} onChange={(v) => update('phone', v)} placeholder="+33612345678" />
        <FormField label="Website" name="url" type="url" value={basics.url ?? ''} onChange={(v) => update('url', v)} placeholder="https://example.com" />
      </div>

      <FormField label="Summary" name="summary" value={basics.summary ?? ''} onChange={(v) => update('summary', v)} rows={3} placeholder="A brief professional summary..." />


      <div>
        <h4 className="mb-3 text-sm font-bold text-ink-soft">Location</h4>
        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          <FormField label="City" name="city" value={basics.location?.city ?? ''} onChange={(v) => updateLocation('city', v)} placeholder="Lyon" />
          <FormField label="Region" name="region" value={basics.location?.region ?? ''} onChange={(v) => updateLocation('region', v)} placeholder="Auvergne-Rhone-Alpes" />
          <FormField label="Country code" name="countryCode" value={basics.location?.countryCode ?? ''} onChange={(v) => updateLocation('countryCode', v.toUpperCase())} placeholder="FR" />
          <FormField label="Postal code" name="postalCode" value={basics.location?.postalCode ?? ''} onChange={(v) => updateLocation('postalCode', v)} placeholder="69000" />
        </div>
      </div>
    </div>
  );
}
