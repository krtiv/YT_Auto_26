"""
Template 101-এর সাউন্ড ডিজাইনের সব শব্দ এই স্ক্রিপ্ট দিয়ে কোডেই বানানো হয়।
বাইরের কোনো লাইব্রেরির সাউন্ড না, তাই কপিরাইট ক্লেইমের ভয় নেই।

চালাতে:  python3 tools/sound/make_sounds.py [মোট_সেকেন্ড]
আউটপুট:  public/sfx/*.wav

- vocal_pad.wav  : বাদ্যযন্ত্র ছাড়া, শুধু "ঊঊ/আআ" হামিং ধাঁচের কণ্ঠ (নাশিদ-স্টাইল ব্যাকগ্রাউন্ড)
- whoosh.wav     : নাম্বার ট্রানজিশনের হুশ
- sweep.wav      : নতুন স্লাইড আসার হালকা সুইপ
- pop.wav        : হাইলাইট বক্স খোলার নরম টিক
- chime.wav      : ছোট চাইম (নাম্বারের সাথে)
- bell.wav       : লম্বা চাইম (শেষ/রেফারেন্স স্লাইডে)
"""
import os
import sys

import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, fftconvolve, sosfilt

SR = 44100
RNG = np.random.default_rng(7)
OUT = os.path.join(os.path.dirname(__file__), "..", "..", "public", "sfx")


def save(name, x, peak=0.9):
    x = np.asarray(x, dtype=np.float64)
    if x.ndim == 1:
        x = np.stack([x, x], axis=1)
    m = np.max(np.abs(x)) or 1.0
    x = x / m * peak
    os.makedirs(OUT, exist_ok=True)
    wavfile.write(os.path.join(OUT, name), SR, (x * 32767).astype(np.int16))
    print("wrote", name, f"{len(x) / SR:.2f}s")


def t_axis(sec):
    return np.arange(int(sec * SR)) / SR


def reverb(x, seconds=2.2, mix=0.35, seed=1):
    """সাধারণ স্টেরিও রিভার্ব: এক্সপোনেনশিয়াল-ডিকে নয়েজ দিয়ে কনভলিউশন"""
    rng = np.random.default_rng(seed)
    n = int(seconds * SR)
    env = np.exp(-np.linspace(0, 7, n))
    out = []
    for ch in range(2):
        ir = rng.standard_normal(n) * env
        ir = sosfilt(butter(2, 5000, "low", fs=SR, output="sos"), ir)
        ir /= np.sqrt(np.sum(ir**2))
        wet = fftconvolve(x, ir)[: len(x)]
        out.append((1 - mix) * x + mix * wet)
    return np.stack(out, axis=1)


def sweep_filter_noise(sec, f_start, f_end, q=1.2, shape=None):
    """নয়েজকে সময়ের সাথে সরতে থাকা ব্যান্ডপাস ফিল্টারের ভেতর দিয়ে পাঠানো (state-variable filter)"""
    n = int(sec * SR)
    noise = RNG.standard_normal(n)
    pos = np.linspace(0, 1, n)
    freqs = f_start * (f_end / f_start) ** pos
    low = band = 0.0
    out = np.zeros(n)
    damp = 1.0 / q
    for i in range(n):
        f = 2 * np.sin(np.pi * min(freqs[i], SR / 6) / SR)
        high = noise[i] - low - damp * band
        band += f * high
        low += f * band
        out[i] = band
    env = shape(pos) if shape else np.sin(np.pi * pos) ** 2
    return out * env


# ---------- সাউন্ড ইফেক্ট ----------

def make_whoosh():
    sec = 0.7
    pos = np.linspace(0, 1, int(sec * SR))
    # দ্রুত ফুলে উঠে আস্তে মিলিয়ে যায়
    shape = lambda p: (p / 0.35) ** 2 * (p < 0.35) + np.exp(-(p - 0.35) * 6) * (p >= 0.35)
    a = sweep_filter_noise(sec, 300, 2400, q=1.5, shape=shape)
    b = sweep_filter_noise(sec, 450, 3200, q=1.5, shape=shape)
    x = np.stack([a, b], axis=1)
    save("whoosh.wav", reverb(x[:, 0], 1.0, 0.25) * 0.5 + reverb(x[:, 1], 1.0, 0.25, 2) * 0.5)


def make_sweep():
    sec = 0.45
    shape = lambda p: np.sin(np.pi * p) ** 3
    x = sweep_filter_noise(sec, 1800, 7000, q=2.5, shape=shape)
    save("sweep.wav", reverb(x, 0.8, 0.3))


def make_pop():
    t = t_axis(0.12)
    f = 1100 * np.exp(-t * 28) + 520  # দ্রুত পিচ নামে
    phase = 2 * np.pi * np.cumsum(f) / SR
    env = (1 - np.exp(-t * 900)) * np.exp(-t * 45)
    x = np.sin(phase) * env
    save("pop.wav", reverb(x, 0.6, 0.2))


def bell(freq, sec, decay):
    t = t_axis(sec)
    # ঘণ্টার মতো "ইনহারমোনিক" ওভারটোন
    partials = [(1.0, 1.0), (2.01, 0.45), (2.76, 0.3), (4.07, 0.18), (5.43, 0.1)]
    x = np.zeros_like(t)
    for ratio, amp in partials:
        x += amp * np.sin(2 * np.pi * freq * ratio * t) * np.exp(-t * decay * ratio**0.7)
    attack = 1 - np.exp(-t * 400)
    return x * attack


def make_chime():
    x = bell(1318.5, 1.6, 3.2) + 0.6 * np.pad(bell(1975.5, 1.6 - 0.07, 3.4), (int(0.07 * SR), 0), constant_values=0)[: int(1.6 * SR)]
    save("chime.wav", reverb(x, 2.0, 0.35))


def make_bell():
    sec = 3.2
    n = int(sec * SR)
    x = np.zeros(n)
    # ছোট একটা আর্পেজিও: D6, A5, D6(একটু নিচু ভলিউমে) — নরম "টিং-টিং"
    for delay, f, g in [(0.0, 1174.7, 1.0), (0.16, 880.0, 0.8), (0.32, 1174.7, 0.55)]:
        b = bell(f, sec - delay, 1.6) * g
        s = int(delay * SR)
        x[s:] += b[: n - s]
    save("bell.wav", reverb(x, 2.8, 0.45))


# ---------- ভোকাল প্যাড (নাশিদ-স্টাইল হামিং) ----------

# স্বরবর্ণের ফরম্যান্ট (Hz, ব্যান্ডউইথ, গেইন) — মানুষের গলার "ঊ" আর "আ" এর মতো রঙ দেয়
VOWELS = {
    "oo": [(320, 80, 1.0), (800, 90, 0.35), (2300, 140, 0.08)],
    "aa": [(700, 110, 1.0), (1150, 120, 0.55), (2500, 160, 0.12)],
}


def voice(f0_curve, vowel_mix, seed):
    """একটা কণ্ঠ: হারমোনিক যোগ করে, প্রতিটার জোর ফরম্যান্ট অনুযায়ী ঠিক করা (additive formant synthesis)"""
    rng = np.random.default_rng(seed)
    n = len(f0_curve)
    t = np.arange(n) / SR
    vib = 1 + 0.006 * np.sin(2 * np.pi * (4.8 + rng.random() * 0.6) * t + rng.random() * 6)
    drift = 1 + 0.002 * np.convolve(rng.standard_normal(n), np.ones(4000) / 4000, "same") * 30
    f0 = f0_curve * vib * drift
    phase = 2 * np.pi * np.cumsum(f0) / SR
    out = np.zeros(n)
    max_h = int(4000 / np.min(f0_curve))
    for k in range(1, max_h + 1):
        fk = k * f0
        gain = np.zeros(n)
        for name, w in (("oo", 1 - vowel_mix), ("aa", vowel_mix)):
            for fc, bw, g in VOWELS[name]:
                gain += w * g / (1 + ((fk - fc) / bw) ** 2)
        gain *= 1 / k**0.6  # উপরের হারমোনিক নরম
        gain[fk > 6000] = 0
        out += gain * np.sin(k * phase + rng.random() * 6)
    breath = sosfilt(butter(2, [400, 3000], "band", fs=SR, output="sos"), rng.standard_normal(n)) * 0.02
    return out + breath


def glide_curve(notes, total_sec, glide=0.25):
    """নোটের লিস্ট [(শুরুর_সেকেন্ড, Hz)] থেকে মসৃণ পিচ কার্ভ"""
    n = int(total_sec * SR)
    curve = np.zeros(n)
    for i, (start, f) in enumerate(notes):
        s = int(start * SR)
        e = int(notes[i + 1][0] * SR) if i + 1 < len(notes) else n
        curve[s:e] = f
    k = int(glide * SR)
    return np.convolve(np.pad(curve, (k, k), mode="edge"), np.ones(k) / k, "same")[k:-k]


def make_vocal_pad(total_sec):
    D3, A3, D4 = 146.83, 220.0, 293.66
    # হিজাজ ধাঁচের স্কেল (নাশিদে খুব প্রচলিত): D Eb F# G A Bb C
    Eb4, Fs4, G4, A4 = 311.13, 369.99, 392.0, 440.0
    n = int(total_sec * SR)
    t = np.arange(n) / SR

    # নিচে স্থির ড্রোন (D-A-D), "ঊঊ" হামিং
    drone = (
        voice(np.full(n, D3), 0.15, 1)
        + 0.7 * voice(np.full(n, A3), 0.2, 2)
        + 0.5 * voice(np.full(n, D4 * 1.003), 0.25, 3)
    )

    # উপরে ধীর একটা হামিং মেলোডি, প্রতিটা নোট ~3-4 সেকেন্ড
    phrase = [D4, Eb4, Fs4, G4, Fs4, Eb4, D4, Eb4, Fs4, A4, G4, Fs4, Eb4, D4]
    step = total_sec / len(phrase)
    notes = [(i * step, f) for i, f in enumerate(phrase)]
    mel_curve = glide_curve(notes, total_sec, glide=0.35)
    # প্রতিটা নোটের শুরুতে একটু জোর, তারপর নরম — শ্বাস নেওয়ার মতো
    swell = 0.65 + 0.35 * np.sin(np.pi * ((t % step) / step)) ** 0.8
    melody = voice(mel_curve, 0.4, 4) * swell
    melody2 = voice(mel_curve * 1.004, 0.4, 5) * swell * 0.6  # দ্বিতীয় কণ্ঠ, একটু ডিটিউন — কোরাস ভাব

    mix = drone * 0.55 + (melody + melody2) * 0.5
    mix = sosfilt(butter(2, [90, 5000], "band", fs=SR, output="sos"), mix)
    fade = np.minimum(1, t / 2.5) * np.minimum(1, (total_sec - t) / 3.0)
    save("vocal_pad.wav", reverb(mix * fade, 3.2, 0.5), peak=0.8)


if __name__ == "__main__":
    total = float(sys.argv[1]) if len(sys.argv) > 1 else 30.0
    make_whoosh()
    make_sweep()
    make_pop()
    make_chime()
    make_bell()
    make_vocal_pad(total)
