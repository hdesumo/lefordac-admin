<div className="flex items-center gap-4">
  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      name="highlightMarquee"
      checked={form.highlightMarquee}
      onChange={(e) => setForm({ ...form, highlightMarquee: e.target.checked })}
    />
    Mettre dans le Marquee
  </label>

  {form.type === "video" && (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        name="highlightCarousel"
        checked={form.highlightCarousel}
        onChange={(e) => setForm({ ...form, highlightCarousel: e.target.checked })}
      />
      Mettre dans le Carrousel Vidéo
    </label>
  )}
</div>
