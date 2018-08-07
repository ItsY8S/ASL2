<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\OrderRepository")
 */
class Order
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $shipping_street;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $shipping_town;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $shipping_state;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $shipping_zip;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $billing_street;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $billing_town;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $billing_state;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $billing_zip;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $created_at;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="orders")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user_id;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Items", mappedBy="orders")
     */
    private $items;

    public function __construct()
    {
        $this->items = new ArrayCollection();
    }

    public function getId()
    {
        return $this->id;
    }

    public function getShippingStreet(): ?string
    {
        return $this->shipping_street;
    }

    public function setShippingStreet(string $shipping_street): self
    {
        $this->shipping_street = $shipping_street;

        return $this;
    }

    public function getShippingTown(): ?string
    {
        return $this->shipping_town;
    }

    public function setShippingTown(string $shipping_town): self
    {
        $this->shipping_town = $shipping_town;

        return $this;
    }

    public function getShippingState(): ?string
    {
        return $this->shipping_state;
    }

    public function setShippingState(string $shipping_state): self
    {
        $this->shipping_state = $shipping_state;

        return $this;
    }

    public function getShippingZip(): ?string
    {
        return $this->shipping_zip;
    }

    public function setShippingZip(string $shipping_zip): self
    {
        $this->shipping_zip = $shipping_zip;

        return $this;
    }

    public function getBillingStreet(): ?string
    {
        return $this->billing_street;
    }

    public function setBillingStreet(string $billing_street): self
    {
        $this->billing_street = $billing_street;

        return $this;
    }

    public function getBillingTown(): ?string
    {
        return $this->billing_town;
    }

    public function setBillingTown(string $billing_town): self
    {
        $this->billing_town = $billing_town;

        return $this;
    }

    public function getBillingState(): ?string
    {
        return $this->billing_state;
    }

    public function setBillingState(string $billing_state): self
    {
        $this->billing_state = $billing_state;

        return $this;
    }

    public function getBillingZip(): ?string
    {
        return $this->billing_zip;
    }

    public function setBillingZip(string $billing_zip): self
    {
        $this->billing_zip = $billing_zip;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(?\DateTimeInterface $created_at): self
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUserId(): ?User
    {
        return $this->user_id;
    }

    public function setUserId(?User $user_id): self
    {
        $this->user_id = $user_id;

        return $this;
    }

    /**
     * @return Collection|Items[]
     */
    public function getItems(): Collection
    {
        return $this->items;
    }

    public function addItem(Items $item): self
    {
        if (!$this->items->contains($item)) {
            $this->items[] = $item;
            $item->setOrders($this);
        }

        return $this;
    }

    public function removeItem(Items $item): self
    {
        if ($this->items->contains($item)) {
            $this->items->removeElement($item);
            // set the owning side to null (unless already changed)
            if ($item->getOrders() === $this) {
                $item->setOrders(null);
            }
        }

        return $this;
    }
}
